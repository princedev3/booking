"use client"
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
        <>
        {
            pending?(
                <button disabled className=' min-w-[150px] bg-red-500 font-medium capitalize text-white rounded-md py-2  cursor-pointer flex items-center justify-center' >
                    <Loader2 className='mr-2 h-4 w-4  animate-spin'/>
                    please wait
                </button>
            ):(
                <button className='min-w-[150px] bg-red-500 font-medium capitalize text-white rounded-md py-2  cursor-pointer'>cancel booking</button>
            )
        }
        </>
      )
    }


export default SubmitButton