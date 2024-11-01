import Heading from '@/components/heading'
import { cookies } from 'next/headers';
import React from 'react'
import jwt from 'jsonwebtoken';
import prisma from '@/data/prisma';
import RoomCard from '@/components/room-card';
import MyCard from '@/components/mycard';

const MyRooms = async() => {
    const cookiesList = cookies();
    const loginToken = cookiesList.get('loginToken')?.value;  
    let userData
    if (loginToken) {
        try {
          userData = jwt.verify(loginToken, process.env.NEXT_PUBLIC_SECRETE as string);
        } catch (error) {
          console.error("Error verifying login token:", error);
        }
      } else {
        console.log("No login token found.");
      }
      const myRooms = await prisma.home.findMany({
        where:{
            user_id:(userData as jwt.JwtPayload).id
        }
      })
      
  return (
    <div className='p-4 md:p-0 '>
        <Heading title='my rooms'/>
        <div className="grid gap-y-4">
        {
         myRooms.map((room,index)=>(
        <MyCard {...room} index={index}  key={room.id}/>
          ))
         }
        </div>
    </div>
  )
}

export default MyRooms