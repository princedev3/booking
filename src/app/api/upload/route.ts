import prisma from "@/data/prisma";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async(req:NextRequest)=>{
try {
    const data = await req.formData();
    const user_id = req.headers.get('userId');
    if(!user_id){
        return new NextResponse(JSON.stringify({message:"you are not authorised"}),{status:500})
    }
const textFields: { [key: string]: string } = {};

let file: File | null = null;


Array.from(data.entries()).forEach(([key, value]) => {
    if (typeof value === 'string') {
      textFields[key] = value;
    }else if(typeof value ==="number" ){
        textFields[key] = value
    }else if (value instanceof File) {
      file = value;
    }
  });

 
  if(!file){
    return new NextResponse(JSON.stringify({message:"upload an image"}),{status:500})
  }
      const bytes =  await (file as File).arrayBuffer();
      const buffer = Buffer.from(bytes)
      const path = join(process.cwd(),"public",(file as File).name)
      await writeFile(path,buffer)
      const res = await prisma.home.create({
        data:{
            ...textFields,sqft:Number(textFields.sqft),capacity:Number(textFields.capacity),price_per_hour:Number(textFields.price_per_hour),image:path,user_id:Number(user_id) 
        }
      })
      return new NextResponse(JSON.stringify(res),{status:200})
  
} catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({message:"failed to save "}),{status:500})
}

}