//update availabaility of stock
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/product.model";
import { requireAdmin } from "@/lib/checkAdmin";

export async function PUT(req,{params}){
    try{
      await requireAdmin(req);
      const {id}=await params;
      const {isFeatured}=await req.json();
      if(!id)
        return NextResponse.json({status:"error",message:"No Product is selected"},{status:401})
  
      const product=await Product.findByIdAndUpdate(id, {
        featured: isFeatured
      });
      return NextResponse.json(
        { status: "success", message:"Featued changed"},
      );
    }
    catch(err){
      return NextResponse.json(
        { status: "error", message: err.message},
        { status: 500 }
    );
    }
  }
  
  