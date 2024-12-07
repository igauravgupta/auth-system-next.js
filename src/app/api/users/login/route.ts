import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/dbconfig/dbconfig";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // token
    const token_data = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(token_data, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json(
      { message: "Login successful", user: user._id },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
