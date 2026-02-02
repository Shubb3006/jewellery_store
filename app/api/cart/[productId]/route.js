import { getUserFromCookie } from '@/lib/auth';
import  Cart  from '@/models/cart.model';
import { NextResponse } from 'next/server';
import  Product  from '@/models/product.model';

export async function DELETE(req,{params}){
    try{
        const user=await getUserFromCookie(req)
        if (!user) 
            return NextResponse.json({status:"error",message:"Try to login first"},{status:401})

        const {productId}=await params;
        if(!productId)
            return NextResponse.json({status:"error",message:"No Product is selected"},{status:401})

        const cart=await Cart.findOne({userId:user._id});
        if (!cart) {
            return NextResponse.json(
              { status: "error", message: "Cart not found" },
              { status: 404 }
            );
        }

        cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)

        await cart.save();

        const updatedCart=await Cart.findOne({userId:user._id}).populate("items.productId");


        return NextResponse.json({
          status: "success",
          message: "Product removed from cart",
          updatedCart,
        });

    }catch(err){
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
