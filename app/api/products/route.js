import { requireAdmin } from "@/lib/checkAdmin";
import { connectDB } from "@/lib/db";
import productModel from "@/models/product.model";
import { NextResponse } from "next/server";

// 👉 GET all products
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");

    let filter = {};
    if (category && category !== "null" && category !== "") {
      filter.category = category;
    }

    let sortOption = {};
  if (sort === "price-asc") sortOption.price = 1;
  if (sort === "price-desc") sortOption.price = -1;
  if (sort === "newest") sortOption.createdAt = -1;

  const products = await productModel.find(filter).sort(sortOption);


    return NextResponse.json({ status: "success", products });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}