import { connectDB } from "@/lib/db";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";

export async function GET(req) {
  try {
    await connectDB();
    await requireAdmin(req);

    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      status: "success",
      orders,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
