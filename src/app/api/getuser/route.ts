import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const token = req.headers.get("userId");
    return new NextResponse(JSON.stringify({ message: " get user" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "can not get user" }), {
      status: 500,
    });
  }
};
