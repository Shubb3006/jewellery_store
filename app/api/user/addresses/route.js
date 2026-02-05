import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const user = await getUserFromCookie(req);
  if (!user) {
    return NextResponse.json(
      { status: "error", message: "Try to login first" },
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

    const addresses = userDoc.addresses || []; // return empty array if none

    return NextResponse.json({ status: "success", addresses });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req){
    await connectDB();

    const user = await getUserFromCookie(req);
    if (!user) {
      return NextResponse.json(
        { status: "error", message: "Try to login first" },
        { status: 401 }
      );
    }   

    const body=await req.json();

    try {
        const userDoc = await User.findById(user._id); // fetch user by _id
        if (!userDoc) {
          return NextResponse.json(
            { status: "error", message: "User not found" },
            { status: 404 }
          );
        }
        if(body.isDefault) userDoc.addresses.forEach((addr) => (addr.isDefault = false));
        userDoc.addresses.push(body);
        await userDoc.save() // return empty array if none
    
        return NextResponse.json({ status: "success", addresses:userDoc.addresses });
      } catch (err) {
        console.error(err);
        return NextResponse.json(
          { status: "error", message: "Something went wrong" },
          { status: 500 }
        );
      }
  
}