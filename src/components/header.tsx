"use client"
import { RemoveNullContext } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
  const {currentUser,setCurrentUser,updateUser}=RemoveNullContext()
  const router = useRouter()

 const handleLogout = async()=>{
try {
  const res =  await fetch(`http://localhost:3000/api/logout`,{method:"POST"})
  setCurrentUser(null)
  if(res.ok){
    router.push("/login")
  }
} catch (error) {
  console.log(error)
}
 }
  return (
    <div>
        <div className="min-h-16 bg-black/5 flex justify-between md:items-center items-start p-3">
          <div className="flex gap-5 flex-col items-center md:flex-row h-full ">
       <div className="flex gap-1 items-center">
        <Link href={"/"} className='flex gap-1 items-center'>
       <Image src={"/logo.svg"} alt='' width={40} height={40}/>
       <h1 className="capitalize font-semibold  cursor-pointer">Bookit</h1>
        </Link>
       </div>
            <div className="flex  gap-4 flex-col md:flex-row ">
            {
            currentUser &&
            <>
                <Link href={"/book-a-room"} className=" nav-item px-1 capitalize font-semibold  cursor-pointer w-fit">booking</Link>
                <Link href={"/add-room"} className=" nav-item px-1 capitalize font-semibold  cursor-pointer w-fit">add room</Link>
                <Link href={"/booking"} className=" nav-item px-1 capitalize font-semibold  cursor-pointer w-fit">my booking</Link>
            </>
                }
            </div>
          </div>
         <div className="flex gap-5">
          {
            !currentUser &&
            <>
             <Link href={"/login"} className="capitalize font-semibold cursor-pointer">login</Link>
             <Link href={"/register"} className="capitalize font-semibold cursor-pointer">register</Link>
            </>
          }
         
         {
          currentUser &&
         <Link href={"/my-rooms"} className="capitalize font-semibold cursor-pointer">my rooms</Link>
         } 
          <h2 onClick={handleLogout} className="capitalize font-semibold cursor-pointer">sign out</h2>
         </div>
        </div>
    </div>
  )
}

export default Header