import prisma from "@/data/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const { password, email } = await req.json();
  try {
    if (!password || !email) {
      return new Response(JSON.stringify({ message: "login failed" }), {
        status: 500,
      });
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      return new Response(JSON.stringify({ message: "login failed" }), {
        status: 500,
      });
    }
    const age = 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: findUser?.id as number,
      },
      process.env.SECRETE as string,
      { expiresIn: age }
    );

    const cookie = cookies().set("loginToken", token, {
      httpOnly: true,
      maxAge: age,
      path: "/",
      sameSite: "strict",
      secure: false,
    });
    const cookieString = cookie.toString();
    const isPassWordCorrect = bcrypt.compareSync(
      password,
      findUser?.password as string
    );
    if (isPassWordCorrect) {
      return new Response(
        JSON.stringify({
          names: findUser?.names,
          email: findUser?.email,
          id: findUser?.id,
          active: findUser?.active,
        }),
        { status: 200, headers: { "Set-Cookie": cookieString } }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ mmessage: "login failed" }), {
      status: 500,
    });
  }
};
