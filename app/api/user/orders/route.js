import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Cart from "@/models/cart.model";
import Order from "@/models/order.model";
import Product from "@/models/product.model"; // required for populate
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const {address,paymentMethod}=await req.json();

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }
    const user = await getUserFromCookie(req);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Login required" },
        { status: 401 }
      );
    }

    const cart = await Cart.findOne({ userId: user._id })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { status: "error", message: "Cart is empty" },
        { status: 400 }
      );
    }


    for (const item of cart.items) {
      const product = item.productId;
    
      if (!product ||  product.isActive === false || product.stock < item.quantity) {
        return NextResponse.json(
          {
            status: "error",
            message: `${product?.name} is out of stock`,
          },
          { status: 400 }
        );
      }
    }
    

    const orderItems = cart.items.map((item) => ({
      product: item.productId._id,
      name:item.productId.name,
      quantity: item.quantity,
      priceAtOrder: item.productId.price, // ✅ FIXED
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtOrder,
      0
    );

    const order = await Order.create({
      userId: user._id,
      address,
      paymentMethod,
      items: orderItems,
      totalAmount,
    });

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        {
          $inc: { stock: -item.quantity },
          $set: { isActive: item.productId.stock - item.quantity > 0 },
        }
      );

        
    }    
    
    cart.items = [];
    await cart.save();

    return NextResponse.json({
      status: "success",
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const user = await getUserFromCookie(req);
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "Login required" },
      { status: 401 }
    );
  }

  const orders = await Order.find({ userId: user._id })
    .populate("items.product")
    .sort({ createdAt: -1 });

  return NextResponse.json({
    status: "success",
    orders,
  });
}
