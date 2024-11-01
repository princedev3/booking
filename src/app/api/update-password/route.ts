import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const min = 1000;
    const max = 9999;
    const digit = Math.floor(Math.random() * (max - min + 1)) + min;

    const age = 60 * 60;

    const token = jwt.sign(
      {
        digit,
      },
      process.env.SECRETE as string,
      { expiresIn: age }
    );

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
      },
    });
    cookies().set("updatePasswordToken", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    const mailOption: Mail.Options = {
      from: "bookit",
      to: email,
      subject: "hello",
      html: `
         <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Activate Your Account</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; background-color: #4CAF50; padding: 10px 0; color: white; font-size: 24px; font-weight: bold; border-radius: 8px 8px 0 0;">
          Activate Your Account
        </div>
        <div style="padding: 20px; color: #333; font-size: 16px; line-height: 1.5;">
          <p>Hello,</p>
          <p>Please activate your account by using the activation code that was sent to your email</p>
           <p style="color:#4293f5; font-weight: bold;"> Reset password Code: ${digit}</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
          <p>&copy; 2024 Bookit. All rights reserved.</p>
        </div>
      </div>
      </body>
      </html>
        `,
    };
    await transport.sendMail(mailOption);
    return new Response(JSON.stringify({ mmessage: "" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ mmessage: "can not create password" }),
      { status: 500 }
    );
  }
};
