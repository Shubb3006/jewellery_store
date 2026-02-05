import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Cart from "@/models/cart.model";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

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
    cart.items = cart.items.filter(item => {
      const product = item.productId;
      return product && product.isActive === true;
    });

    await cart.save(); // ✅ VERY IMPORTANT

    return NextResponse.json({
      status: "success",
      message: "Unavailable items removed",
      cart,
    });

  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
