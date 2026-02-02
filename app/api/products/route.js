import { requireAdmin } from "@/lib/checkAdmin";
import { connectDB } from "@/lib/db";
import productModel from "@/models/product.model";
import { NextResponse } from "next/server";

// 👉 GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await productModel.find();
    return NextResponse.json({ status: "success", products });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}