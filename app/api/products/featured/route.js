import { connectDB } from "@/lib/db";
import Product  from '@/models/product.model';
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
  
    const products = await Product.find({
      featured: true,
      isActive: true,
      stock: { $gt: 0 },
    }).limit(8);

  
    return NextResponse.json({ products });
  }
  
  