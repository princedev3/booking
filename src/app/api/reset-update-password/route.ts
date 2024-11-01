import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/data/prisma";

export const PUT = async (req: NextRequest) => {
  try {
    const { token, email } = await req.json();
    const decodedEmail = decodeURIComponent(email);

    const cookiesList = cookies();
    const updateResetToken = cookiesList.get("updatePasswordToken")
      ?.value as string;
    const digitvalue = jwt.verify(
      updateResetToken,
      process.env.NEXT_PUBLIC_SECRETE as string
    );
    const digit = (digitvalue as jwt.JwtPayload).digit;
    console.log(digit);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: decodedEmail,
      },
    });

    if (digit === Number(token) && existingUser) {
      await prisma.user.update({
        where: {
          email: decodedEmail,
        },
        data: {
          token,
        },
      });
      return new NextResponse(JSON.stringify({ message: "code match" }), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ message: "something went wrong" }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "code does not match" }),
      { status: 500 }
    );
  }
};
