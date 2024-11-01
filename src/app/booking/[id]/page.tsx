import { UserId } from '@/components/actions/get-userId'
import SingleBookingInvoice from '@/components/SingleBookingInvoice'
import prisma from '@/data/prisma'
import React from 'react'

const SingleBooking =async ({params}:{params:{id:string}}) => {
    const id =parseInt(params.id)
    const userId =  UserId()
    
    const singlebook = await prisma.bookings.findUnique({
        where:{
            id,user_id:Number(userId?.id)
        },
        include:{
            home:true
        }
    })
  return (
    <div className='my-8'>
      <SingleBookingInvoice singlebook={singlebook} />
    </div>
  )
}

export default SingleBooking