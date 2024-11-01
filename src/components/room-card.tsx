"use client"
import { roomTypes } from '@/data/types'
import { Home } from '@prisma/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type HomeWithIndex = Home & { index: number };
const RoomCard = ({id,user_id,name,description,sqft,capacity,location,address,amenities,availability,price_per_hour,image,index}:HomeWithIndex) => {  
  const fadeInAnimateVariants={
    initial:{
        opacity:0,
        y:100,
    },
    animate:(index:number)=>({
            opacity:1,
            y:0,
            transition:{
                delay:0.05*index
            }
        }
    )
  }
    return (
    <motion.div custom={index} variants={fadeInAnimateVariants} initial={"initial"} viewport={{once:true}} whileInView={"animate"} key={id} className='py-7 border-b border-gray-300 flex items-center justify-between'>
        <div className="flex gap-2 h-full">
            <div className="min-h-[120px] min-w-[120px] relative ">
                <Image src={"/"+image?.split("\\")[image?.split("\\").length-1]} alt='' fill className='object-cover rounded-lg' priority/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='font-bold text-sm'>{name} </h1>
                <p className="text-sm text-gray-400 w-[60%] md:w-full ">Address: {address} </p>
                <p className="text-sm text-gray-400">Availability: {availability} </p>
                <p className="text-sm text-gray-400">Price: {price_per_hour} </p>
            </div>
        </div>
        <Link href={`/rooms/${id}`} className="cursor-pointer">
            <button className='capitalize bg-blue-500 text-white font-semibold rounded-lg p-2 '>view room</button>
        </Link>
    </motion.div>
  )
}

export default RoomCard