import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mail";
import User from "@/models/user.model";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email }: any = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await sendMail(email, "VERIFY", user);
    return NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
