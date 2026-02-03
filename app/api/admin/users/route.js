import { requireAdmin } from "@/lib/checkAdmin";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model"
import { NextResponse } from "next/server";
export async function GET(req){
    try {
        await connectDB();
        await requireAdmin(req)

        const users=await User.find();
        return NextResponse.json({
            status: "success",
            users,
        }
        )
    } catch (error) {
        return NextResponse.json(
            { status: "error", message: error.message },
            { status: 500 }
          );
    }
}