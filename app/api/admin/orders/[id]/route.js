import { connectDB } from "@/lib/db";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/checkAdmin";
import mongoose from "mongoose";

const ALLOWED_STATUS = [
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export async function PUT(req, { params }) {
  try {
    await connectDB();
    await requireAdmin(req);

    const { id } = await params;
    const { status } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { status: "error", message: "Invalid order id" },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUS.includes(status)) {
      return NextResponse.json(
        { status: "error", message: "Invalid status" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { status: "error", message: "Order not found" },
        { status: 404 }
      );
    }

    // 🚫 Prevent invalid transitions
    if (order.orderStatus === "DELIVERED") {
      return NextResponse.json(
        { status: "error", message: "Delivered order cannot be changed" },
        { status: 400 }
      );
    }

    order.orderStatus = status;
    await order.save();

    return NextResponse.json({
      status: "success",
      message: "Order status updated",
      order,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
