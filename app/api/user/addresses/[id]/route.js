import { getUserFromCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}) {
  await connectDB();

  const user = await getUserFromCookie(req);
  const {id}=await params;
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

    userDoc.addresses = userDoc.addresses.filter(
        (address) => address._id.toString() !== id
      );
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
