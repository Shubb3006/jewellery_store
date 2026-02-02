import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/product.model";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // ❌ invalid MongoDB ObjectId check
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { status: "error", message: "Invalid product ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { status: "error", message: "Product not found" },
        { status: 404 }
      );
    }

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

