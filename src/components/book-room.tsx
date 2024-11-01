"use client"
import React, { Fragment, useState } from 'react'
import BookingForm from './booking-form'
import { Home } from '@prisma/client'
import Link from 'next/link';
import { CiLink } from "react-icons/ci";
import {motion} from "framer-motion"


  interface roomsProps {
    rooms:  Home[];
  }
const BookRoom = ({rooms}:roomsProps) => {

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
      const[id,setId]= useState<number>()
  return (
    <div>
        <div className="flex  gap-4 flex-wrap mt-10">
            {rooms.map((item,index)=>(
                <motion.div  custom={index} variants={fadeInAnimateVariants} initial={"initial"} viewport={{once:true}} whileInView={"animate"}  className={`${id===item.id?"bg-gray-200":""} flex items-center gap-2 border border-gray-400 p-2  rounded-md cursor-pointer`} >
                    <p  onClick={()=>setId(item.id)} className="">{item.name} </p>
                    <Link href={"/rooms/"+item.id} className="">< CiLink className='font-bold text-[30px] rounded-md p-1 bg-green-100' /></Link>
                </motion.div>
            ))}
        </div>
        <BookingForm id={id}/>
    </div>
  )
}

export default BookRoom