import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Cart from "@/models/cart.model";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { address, paymentMethod, items } = await req.json();

    if (!address) return NextResponse.json({ message: "Address is required" }, { status: 400 });
    if (!items || items.length === 0) return NextResponse.json({ message: "No items to checkout" }, { status: 400 });

    const user = await getUserFromCookie(req);
    if (!user) return NextResponse.json({ message: "Login required" }, { status: 401 });

    const isBuyNowCheckout = items.some(i => i.isBuyNow);
    let orderItems = [];

    if (isBuyNowCheckout) {
      // Buy Now checkout
      for (const i of items) {
        const product = await Product.findById(i.productId);
        if (!product || !product.isActive || product.stock < i.quantity)
          return NextResponse.json({ message: `${product?.name || "Product"} is out of stock` }, { status: 400 });

        orderItems.push({
          product: product._id,
          name: product.name,
          quantity: i.quantity,
          priceAtOrder: product.price,
        });
      }
    } else {
      // Cart checkout
      const cart = await Cart.findOne({ userId: user._id }).populate("items.productId");
      if (!cart || cart.items.length === 0) return NextResponse.json({ message: "Cart is empty" }, { status: 400 });

      for (const item of cart.items) {
        const product = item.productId;
        if (!product || !product.isActive || product.stock < item.quantity)
          return NextResponse.json({ message: `${product?.name} is out of stock` }, { status: 400 });

        orderItems.push({
          product: product._id,
          name: product.name,
          quantity: item.quantity,
          priceAtOrder: product.price,
        });
      }

      // Clear cart
      cart.items = [];
      await cart.save();
    }

    // Update stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      await Product.findByIdAndUpdate(item.product, {
        stock: product.stock - item.quantity,
        isActive: product.stock - item.quantity > 0,
      });
    }

    const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.priceAtOrder, 0);

    const order = await Order.create({ userId: user._id, address, paymentMethod, items: orderItems, totalAmount });

    return NextResponse.json({ status: "success", message: "Order placed successfully", order });
  } catch (err) {
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const user = await getUserFromCookie(req);
    if (!user) return NextResponse.json({ status: "error", message: "Login required" }, { status: 401 });

    const orders = await Order.find({ userId: user._id }).populate("items.product").sort({ createdAt: -1 });

    return NextResponse.json({ status: "success", orders });
  } catch (err) {
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}