"use client"
import { Home } from '@prisma/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Check, ChevronDown, CreditCard, Download, Ellipsis, Trash } from 'lucide-react';
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { handleDeleteHall } from './actions/action'
import toast from 'react-hot-toast'

type HomeWithIndex = Home & { index: number };
const MyCard = ({id,user_id,name,description,sqft,capacity,location,address,amenities,availability,price_per_hour,image,index}:HomeWithIndex) => {  
    const [loading,setLoading]= useState(false)
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

  const handleDelete = async(formData:FormData)=>{
   try {
    setLoading(true)
    await handleDeleteHall(formData)
    toast.success("deleted")
    setLoading(false)
} catch (error) {
    console.log(error)
       setLoading(false)
    
   }
  }
    return (
    <motion.div custom={index} variants={fadeInAnimateVariants} initial={"initial"} viewport={{once:true}} whileInView={"animate"} key={id} className='py-7 border-b border-gray-300 flex items-center justify-between'>
        <Link href={`/rooms/${id}`} className="cursor-pointer flex gap-2 h-full" >
            <div className="min-h-[120px] min-w-[120px] relative ">
                <Image src={"/"+image?.split("\\")[image?.split("\\").length-1]} alt='' fill className='object-cover rounded-lg' priority/>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='font-bold text-sm'>{name} </h1>
                <p className="text-sm text-gray-400 w-[60%] md:w-full ">Address: {address} </p>
            </div>
        </Link>
        <Dialog>
        <DropdownMenu>
  <DropdownMenuTrigger className='h-fit '>
  <span className='capitalize  text-gray-600 font-semibold rounded-lg w-fit h-fit ' ><Ellipsis className='w-7 h-7' /></span>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
        <Link href={`/rooms/${id}`} className='flex items-center gap-1 justify-center cursor-pointer bg-blue-500 text-white w-full p-2 rounded-md'>
        <FaRegEye className='text-lg'/>
        <span className="capitalize font-medium">View</span>
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
    <DialogTrigger asChild>
    <button className='flex items-center gap-1 justify-center cursor-pointer bg-red-500 text-white w-full p-2 rounded-md'>
       <MdDelete className='text-lg'/>
        <span className="capitalize font-medium">delete</span>
        </button>
    </DialogTrigger>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> 
<DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
        <form action={handleDelete} className="my-3">
             <input type="hidden" name='id' value={id}/>
            <button disabled={loading} className='w-full p-2 disabled:cursor-not-allowed bg-red-500 text-white font-semibold cursor-pointer capitalize rounded-md outline-none active:border-none'>delete</button>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
        </Dialog>
    </motion.div>
  )
}

export default MyCard