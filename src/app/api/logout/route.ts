import { cookies } from "next/headers";
export const POST = async()=>{
    try {
        const cookieStore = cookies();
        cookieStore.set('loginToken', '', {
          httpOnly: true,
          maxAge: 0, 
          path: '/',
          sameSite: 'strict',
          secure: false,
        });
        return new Response(JSON.stringify({mmessage:"logout successful"}),{status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({mmessage:"logout failed"}),{status:500})
    }
}