"use client"
import React, { useState } from 'react'
import { handleBooking } from './actions/action'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const BookingForm = ({id}:{id:number|undefined}) => {
  const path = usePathname()
  const[loading,setLoading]=useState(false)
  const router = useRouter()
const handleBookingAction = async (formData:FormData)=>{
  try {
    setLoading(true)
  const res =    await  handleBooking(formData)
if(res.message==="booked"){
  toast.success(res.message)
  router.push("/booking")
  setLoading(false)
}else{
  toast.error(res.message)
  setLoading(false)
}

} catch (error) {
  console.log(error)
  toast.error("failed")
    setLoading(false)
  }
}
 
  return (
    <div className='mb-10'>
       <h1 className="pb-2 text-2xl font-bold py-10 mb-5">Book this Room</h1>
       <form action={handleBookingAction}  className="" >
        <input type="text" className='hidden' name='id' id='id' value={id} />
        <input type="text" className='hidden' name='path' id='id' value={path} />
   <div className="grid grid-cols-2 gap-8 gap-y-10">
   <div className="w-full  flex flex-col gap-1">
            <label htmlFor="check-in-date" className='font-medium text-gray-700'>Check-in-Date</label>
            <input type="date" id='check-in-date' name='check-in-date' required  className='border-2 p-2 rounded-lg border-gray-300 placeholder:text-gray-300'/>
        </div>
        <div className="w-full  flex flex-col gap-1">
            <label htmlFor="check-in-time" className='font-medium text-gray-700'>Check-in-Time</label>
            <input type="time" id='check-in-time' name='check-in-time' required  className='border-2 p-2 rounded-lg border-gray-300 placeholder:text-gray-300'/>
        </div>
        <div className="w-full  flex flex-col gap-1">
            <label htmlFor="check-out-date" className='font-medium text-gray-700'>Check-out-Date</label>
            <input type="date" id='check-out-date' name='check-out-date' required  className='border-2 p-2 rounded-lg border-gray-300 placeholder:text-gray-300'/>
        </div>
        <div className="w-full  flex flex-col gap-1">
            <label htmlFor="check-out-Time" className='font-medium text-gray-700'>Check-out-Time</label>
            <input type="time" id='check-out-Time'  name='check-out-time'required  className='border-2 p-2 rounded-lg border-gray-300 placeholder:text-gray-300'/>
        </div>
   </div>
   <button disabled={loading} className={`disabled:cursor-not-allowed bg-black p-3 cursor-pointer  text-center w-full rounded-lg my-8 text-white font-semibold`} >Book Room</button>
       </form>
    </div>
  )
}

export default BookingForm