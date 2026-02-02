// app/api/cart/merge/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/cart.model";
import Product from "@/models/product.model";
import { getUserFromCookie } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  const user = await getUserFromCookie(req);
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { items } = await req.json(); // from localStorage

  if (!items || !items.length) {
    return NextResponse.json({ success: true });
  }

  let cart = await Cart.findOne({ userId: user._id });
  if (!cart) {
    cart = await Cart.create({ userId: user._id, items: [] });
  }

  for (const guestItem of items) {
    const product = await Product.findById(guestItem.productId._id);

    if (!product || !product.isActive || product.stock === 0) continue;

    const index = cart.items.findIndex(
      (i) => i.productId.toString() === product._id.toString()
    );

    const qty = Math.min(guestItem.quantity, product.stock);

    if (index > -1) {
      cart.items[index].quantity = Math.min(
        cart.items[index].quantity + qty,
        product.stock
      );
    } else {
      cart.items.push({
        productId: product._id,
        quantity: qty,
      });
    }
  }

  await cart.save();

  const updatedCart = await cart.populate("items.productId");

  return NextResponse.json({
    success: true,
    cart: updatedCart,
  });
}
