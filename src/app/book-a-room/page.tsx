import BookRoom from '@/components/book-room'
import BookingForm from '@/components/booking-form'
import prisma from '@/data/prisma'
import React from 'react'

const BookARoom = async() => {
 const rooms = await prisma.home.findMany()
  return (
    <div>
          <p className="text-lg font-medium my-5">Kindly, select a room</p>
        < BookRoom rooms={rooms} />
    </div>
  )
}

export default BookARoom