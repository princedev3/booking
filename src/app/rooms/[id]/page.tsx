import React from 'react'
import Heading from '@/components/heading'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';
import BookingForm from '@/components/booking-form';
import prisma from '@/data/prisma';

const SingleRoom = async({params}:{params:{id:string}}) => {
    const id = parseInt(params.id)

    const room = await prisma.home.findUnique({
        where:{
            id
        }
    })
    if(!room){
        return <Heading title='Room not found'/>
    }
  return (
    <div className='mb-5 px-5 md:px-0'>
        <Heading title={room.name as string} />
        <div className="">
            <p className="text-gray-500 flex  gap-3 cursor-pointer py-8"><IoIosArrowBack/> <Link href="/" className="text-sm">Back to Rooms</Link></p>
             <div className="grid  grid-cols-1 md:grid-cols-2  gap-8 mb-8">
                <div className="relative w-full h-[50vh]  ">
                    <Image src={"/"+(room?.image as string).split("\\")[(room?.image as string).split("\\").length-1]} alt='' fill className='rounded-lg object-cover' priority/>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500">{room.description} </p>
                    <p className="text-sm text-gray-500"> Size: {room.sqft} </p>
                    <p className="text-sm text-gray-500"> Availability: {room.availability} </p>
                    <p className="text-sm text-gray-500"> Price: {room.price_per_hour} </p>
                    <p className="text-sm text-gray-500"> Address: {room.address} </p>
                </div>
             </div>
        <BookingForm id={id} />
        </div>
    </div>
  )
}

export default SingleRoom