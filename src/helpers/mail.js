import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "@/models/user.model";

export const sendMail = async (email, emailType, user) => {
  try {
    console.log(user);
    const hashedToken = await bcrypt.hash(user.id, 10);
    if (emailType === "VERIFY") {
      await User.updateOne(
        { email: email },
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      );
    } else if (emailType === "RESET") {
      await User.updateOne(
        { email: email },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1298493359961b",
        pass: "a7636c1423c622",
      },
    });
    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
