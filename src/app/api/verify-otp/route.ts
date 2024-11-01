import prisma from "@/data/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const verifyToken = (token: string, secret: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

export const PUT = async (req: Request) => {
  try {
    const { token: tokenId } = await req.json();
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated" }),
        { status: 500 }
      );
    }
    const payload = await verifyToken(
      token.value,
      process.env.SECRETE as string
    );
    if (payload.digit.toString() !== tokenId) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated" }),
        { status: 500 }
      );
    }
    const { active } = await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        active: true,
      },
    });
    return new NextResponse(JSON.stringify(active), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), {
      status: 500,
    });
  }
};
