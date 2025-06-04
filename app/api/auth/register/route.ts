import { NextRequest, NextResponse, userAgent } from "next/server"; //special in nextjs
import { connectToDatabase } from "@/lib/db"; // for database connection
import User from "@/models/user";


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password is required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return NextResponse.json(
        { error: "Email already exist" },
        { status: 400 }
      );
    }
    await User.create({
      email,
      password,
    });
     return NextResponse.json(
        { message: "welcome to the application" },
        { status: 201 }
      );
  } catch (error) {
    console.error(error)
     return NextResponse.json(
        { error:  "registration failed"},
        { status: 500 }
      );
  }
}
