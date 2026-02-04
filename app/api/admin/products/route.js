//add product
import { requireAdmin } from "@/lib/checkAdmin";
import { connectDB } from "@/lib/db";
import productModel from "@/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    await requireAdmin(req)
    const body = await req.json();
      
    if (!body.name || !body.price || !body.images?.length || !body.stock) {
      return NextResponse.json(
        { status: "error", message: "Name, Price, Stock & Images are required" },
        { status: 400 }
      );
    }
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
