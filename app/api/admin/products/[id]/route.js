//edit product
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/product.model";
import { requireAdmin } from "@/lib/checkAdmin";


  export async function PUT(req, { params }) {
    await connectDB();
    await requireAdmin(req);
  
    try {
      const { id } = await params;
      if (!id) {
        return NextResponse.json(
          { status: "error", message: "Product ID missing" },
          { status: 400 }
        );
      }
  
      const body = await req.json();
  
      // Allowed fields only (security)
      const allowedFields = [
        "name",
        "price",
        "category",
        "stock",
        "isActive",
        "description"
      ];
  
      const updateData = {};
  
      allowedFields.forEach((field) => {
        if (body[field] !== undefined) {
          updateData[field] = body[field];
        }
      });
  
      if (Object.keys(updateData).length === 0) {
        return NextResponse.json(
          { status: "error", message: "No valid fields to update" },
          { status: 400 }
        );
      }
  
      const product = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
  
      if (!product) {
        return NextResponse.json(
          { status: "error", message: "Product not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        status: "success",
        message: "Product updated successfully",
        product
      });
  
    } catch (err) {
      return NextResponse.json(
        { status: "error", message: err.message },
        { status: 500 }
      );
    }
  }
  