import { getUserFromCookie } from "@/lib/auth";
import { NextResponse } from "next/server";
import Cart  from '@/models/cart.model';
import { connectDB } from "@/lib/db";
import Product from "@/models/product.model"; // ✅ ADD THIS

export async function GET(req) {
  await connectDB(); // 🔥 REQUIRED

  const user = await getUserFromCookie(req);
  if (!user)
    return NextResponse.json(
      { status: "error", message: "Try to login first" },
      { status: 401 }
    );

  const cart = await Cart.findOne({ userId: user._id })
    .populate("items.productId");

    if (!cart) {
        return NextResponse.json({
          status: "success",
          cart: { items: [] },
        });
    }
    const items = cart.items.map(item => {
        const product = item.productId;
    
        if (!product || product.isActive === false) {
          return {
            ...item.toObject(),
            unavailable: true,
          };
        }
    
        return {
          ...item.toObject(),
          unavailable: false,
        };
    });
    
    return NextResponse.json({
        status: "success",
        cart: {
          ...cart.toObject(),
          items,
        },
    });
}

export async function POST(req){
    try{
        const user=await getUserFromCookie(req);
        if (!user) 
            return NextResponse.json({status:"error",message:"Try to login first"},{status:401})

        const { productId, quantity = 1 } = await req.json();

        const product = await Product.findById(productId)

        if (!product || !product.isActive) {
            return NextResponse.json(
              { status: "error", message: "Product not available" },
              { status: 400 }
            );
        }

        if (product.stock < quantity) {
            return NextResponse.json(
              { status: "error", message: "Insufficient stock" },
              { status: 400 }
            );
          }

        let cart=await Cart.findOne({userId:user._id})
        if(!cart){
            cart=await Cart.create({
                userId:user._id,
                items:[{productId:productId,quantity}]
            })
            return NextResponse.json({
                status: "success",
                message: "Product added to cart",
                cart,
            });
        }

        const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);

        if(itemIndex>-1){
            if(cart.items[itemIndex].quantity < product.stock)
              cart.items[itemIndex].quantity += 1;
              else{
                  return NextResponse.json({
                      status: "error",
                      message: "No more stock available",
                      cart,
                    },{status:401});
              }
        }
        else{
            cart.items.push({ productId: productId, quantity });
        }

        await cart.save();

        return NextResponse.json({
          status: "success",
          message: "Cart updated",
          cart,
        });

        
    }catch(err){
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req){
    try{
        const user=await getUserFromCookie(req);
        if (!user) 
            return NextResponse.json({status:"error",message:"Try to login first"},{status:401})

        const { productId, action } = await req.json();
        if(!productId || !action){
            return NextResponse.json(
                { status: "error", message: "ProductId and action required" },
                { status: 400 }
            );
        }

        const product=await Product.findById(productId);
        if (!product || !product.isActive) {
            return NextResponse.json(
              { status: "error", message: "Product not available anymore" },
              { status: 400 }
            );
          }

        const cart=await Cart.findOne({userId:user._id})

        if(!cart){
            return NextResponse.json(
                { status: "error", message: "Cart not found" },
                { status: 404 }
            );
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return NextResponse.json(
              { status: "error", message: "Product not in cart" },
              { status: 404 }
            );
        }

        if (action === "inc") {
            if(cart.items[itemIndex].quantity < product.stock)
            cart.items[itemIndex].quantity += 1;
            else{
                return NextResponse.json({
                    status: "error",
                    message: "No more stock available",
                    cart,
                  },{status:401});
            }
        }
        if(action==="dec"){
            cart.items[itemIndex].quantity -= 1;
            if(cart.items[itemIndex].quantity<=0){
                cart.items.splice(itemIndex, 1);
            }
        }
      
        await cart.save();
        const updatedCart=await cart.populate("items.productId")

        return NextResponse.json({
          status: "success",
          message: "Cart updated",
          updatedCart,
        });
    }
    catch(err){
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}


export async function DELETE(req) {
  try {
    await connectDB();

    const user = await getUserFromCookie(req);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Try to login first" },
        { status: 401 }
      );
    }

    const cart = await Cart.findOne({ userId: user._id })
      .populate("items.productId");

    if (!cart) {
      return NextResponse.json({
        status: "success",
        cart: { items: [] },
      });
    }

    // 🔥 REMOVE unavailable items
    cart.items = [];

    await cart.save(); // ✅ VERY IMPORTANT

    return NextResponse.json({
      status: "success",
      message: "Cart Deleted",
      cart,
    });

  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
