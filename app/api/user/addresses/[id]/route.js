import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await connectDB();
  
    const user = await getUserFromCookie(req);
    const { id } = await params;
  
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Try to login first" },
        { status: 401 }
      );
    }
  
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "No address id provided" },
        { status: 400 }
      );
    }
  
    try {
      const userDoc = await User.findById(user._id);
  
      if (!userDoc) {
        return NextResponse.json(
          { status: "error", message: "User not found" },
          { status: 404 }
        );
      }
  
      const addressIndex = userDoc.addresses.findIndex(
        (addr) => addr._id.toString() === id
      );
  
      if (addressIndex === -1) {
        return NextResponse.json(
          { status: "error", message: "Address not found" },
          { status: 404 }
        );
      }
  
      const isDefaultDeleted = userDoc.addresses[addressIndex].isDefault;
  
      // 🗑️ Remove address
      userDoc.addresses.splice(addressIndex, 1);
  
      // ⭐ If deleted address was default → set new default
      if (isDefaultDeleted && userDoc.addresses.length > 0) {
        userDoc.addresses[0].isDefault = true;
      }
  
      await userDoc.save();
  
      return NextResponse.json({
        status: "success",
        message: "Address deleted successfully",
        addresses: userDoc.addresses,
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { status: "error", message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  

export async function PUT(req,{params}) {
    await connectDB();
  
    const user = await getUserFromCookie(req);
    const {id}=await params;
    const body=await req.json();
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Try to login first" },
        { status: 401 }
      );
    }
  
    if(!id){
      return NextResponse.json(
          { status: "error", message: "No Address found" },
          { status: 401 }
        );
    }
  
    try {
      const userDoc = await User.findById(user._id); // fetch user by _id
      if (!userDoc) {
        return NextResponse.json(
          { status: "error", message: "User not found" },
          { status: 404 }
        );
      }
    
    if(body.isDefault) userDoc.addresses.forEach((addr) => (addr.isDefault = false));
    
    const address = userDoc.addresses.id(id);

    if (!address) {
        return NextResponse.json(
          { status: "error", message: "Address not found" },
          { status: 404 }
        );
      }
      Object.assign(address, body);
     
        await userDoc.save();
  
        return NextResponse.json({
          status: "success",
          message: "Address updated successfully",
          addresses: userDoc.addresses,
        });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { status: "error", message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  