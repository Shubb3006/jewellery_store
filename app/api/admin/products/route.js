import { requireAdmin } from "@/lib/checkAdmin";
import { connectDB } from "@/lib/db";
import productModel from "@/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    await requireAdmin(req)
    const body = await req.json();

    const product = await productModel.create(body);

    return NextResponse.json({
      status: "success",
      product,
    });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
