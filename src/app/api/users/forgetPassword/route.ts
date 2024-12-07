import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();
  const user = await User.findOne({
    forgetPasswordToken: token,
    forgetPasswordToeknExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.forgetPasswordToken = undefined;
  user.forgetPasswordTokenExpiry = undefined;
  await user.save();
  return NextResponse.json({ message: "Password updated" }, { status: 200 });
}
