import { UserId } from '@/components/actions/get-userId'
import EachBooking from '@/components/each-booking'
import Heading from '@/components/heading'
import prisma from '@/data/prisma'
import Link from 'next/link'
import React from 'react'

const Booking =async() => {
  const userId =  UserId();
  const booking = await prisma.bookings.findMany({
    where:{
      user_id:Number(userId?.id)
    },
    include:{
      home:{
        select:{
          name:true
        }
      }
    }
  })

  return (
    <div>
      <Heading title='Bookings' />
      <div className=" my-5">
        {
          booking.length >0?
          <div className="grid gap-y-10">{
            booking.map(eachBooking=>(
                 <EachBooking {...eachBooking} key={eachBooking.id} />
            ))
          }            
          </div>
          : <span className="text-lg font-semibold ">No booking done </span>
        }
      </div>
    </div>
  )
}

export default Booking