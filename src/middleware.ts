import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; 

async function verifyToken(token: string, secret: string) {
  try {
    const encoder = new TextEncoder(); 
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return payload;
  } catch (error) {
    throw new Error('Invalid Token');
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('loginToken');

  const excludedPaths = ['/register', '/api/login', '/api/verify-otp', '/api/logout'];

  if (excludedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const protectedPaths = ['/booking']; 
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 500 });
    }

    try {
      const payload = await verifyToken(token.value, process.env.SECRETE as string);
      const response = NextResponse.next();
      response.headers.set('userId', String(payload.id));
      return response;
    } catch (error) {
      return new NextResponse(JSON.stringify({ message: "Invalid Token" }), { status: 500 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/upload', '/booking',"/my-rooms"], 
};