import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/helpers/mail";
import User from "@/models/user.model";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    await sendMail(email, "RESET", user);
    return NextResponse.json(
      { message: "Forget password email sent" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
