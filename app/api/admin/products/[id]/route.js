import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/models/product.model";
import { requireAdmin } from "@/lib/checkAdmin";

export async function PUT(req,{params}){
    await connectDB()
    await requireAdmin(req);
    try{
      
      const { action, value = 1 } = await req.json();
  
  
        const {id}=await params;
        if(!id)
            return NextResponse.json({status:"error",message:"No Product is selected"},{status:401})
  
  
        const product=await Product.findById(id);
        if(action==="inc"){
          product.stock=product.stock+value;
        }
        if(action==="dec"){
          product.stock = Math.max(0, product.stock - value);
        }
        await product.save();
        return NextResponse.json({
            status: "success",
            message: "Stock changed",
            product
          });
        }catch(err){
        return NextResponse.json(
            { status: "error", message: err.message},
            { status: 500 }
        );
    }
  }
  
  export async function DELETE(req,{params}){
    try{
      const {id}=await params;
      await requireAdmin(req);
      if(!id)
        return NextResponse.json({status:"error",message:"No Product is selected"},{status:401})
  
      const product=await Product.findByIdAndUpdate(id, {
        isActive: false
      });
      console.log(product)
      return NextResponse.json(
        { status: "success", message:" Product Deleted"},
      );
    }
    catch(err){
      return NextResponse.json(
        { status: "error", message: err.message},
        { status: 500 }
    );
    }
  }
  
  