import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const UserId = () => {
  const cookiesList = cookies();
  const loginToken = cookiesList.get("loginToken")?.value;
  if (!loginToken) {
    return null;
  }
  const userData = jwt.verify(
    loginToken,
    process.env.NEXT_PUBLIC_SECRETE as string
  );
  const id = (userData as jwt.JwtPayload).id as string;
  return {
    id,
  };
};
// new NextResponse(JSON.stringify({meassage:"not authorised"}),{status:500})
