import Link from 'next/link';
import React from 'react'
import { deleteBooking } from './actions/action';
import SubmitButton from './submit-button';
type BookingType=  {
    id:number,
    user_id:number,
    homeId:number,
    check_in:Date,
    check_out:Date,
   home:{name:string|null}}

const EachBooking = ({id,user_id,homeId,check_in,check_out,home}:BookingType) => {
  
    const dateObject = new Date(check_in)
    const dateObjectOut = new Date(check_out)

    const options:Intl.DateTimeFormatOptions = {
        month:"short",
        day:"numeric",
        year:"numeric"
    }

    const formatted = dateObject.toLocaleDateString("en-US",options)
    const formattedout = dateObjectOut.toLocaleDateString("en-US",options)

    const  timeOption:Intl.DateTimeFormatOptions ={
        hour:"numeric",
        minute:'numeric',
        hour12:true,
        timeZone:"UTC"
    } 
    const formattedTime = dateObject.toLocaleTimeString("en-US",timeOption)
    const formattedTimeOut = dateObjectOut.toLocaleTimeString("en-US",timeOption)
    const handleCancelBooking = async(formData:FormData)=>{
        "use server"
        try {
            await deleteBooking(formData)
        } catch (error) {
            console.log(error)
        }
    }
  
  return (
    <div className='border-b border-gray-100 pb-3 flex justify-between items-center '>
    <Link href={"/booking/"+id} className="cursor-pointer">
    <h1 className="text-2xl font-bold mb-3">{home.name} </h1>
    <p className="text-sm font-semibold capitalize">
    check in:
        <span className="text-sm text-gray-500 ml-2 font-medium"> {formatted} <span className="lowercase mx-2"> at </span> {formattedTime}</span>
    </p>
    <p className="text-sm font-semibold capitalize">
    check at:
        <span className="text-sm text-gray-500 ml-2 font-medium"> {formattedout} <span className="lowercase mx-2"> at </span> {formattedTimeOut}</span>
    </p>
    </Link>
    <div className="flex flex-col gap-2">
        <Link href={`/rooms/${homeId}`} className='min-w-[150px] bg-blue-500 font-medium capitalize text-white rounded-md py-2  cursor-pointer text-center'>view room</Link>
        <form action={handleCancelBooking} className="">
            <input type="text" className='hidden' value={id} name='id' id='id' />
            <input type="text" className='hidden' value={user_id} name='user_id' id='user_id' />
            <SubmitButton/>
        </form>
    </div>
    </div>
  )
}

export default EachBooking