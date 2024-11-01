"use client"
import React from 'react'
import { RemoveNullContext } from '@/context/AuthContext'
type singleProps ={
    singlebook:{
        id: number;
        user_id: number;
        homeId: number;
        check_in: Date;
        check_out: Date;
        home:{
            name: string | null;
            id: number;
            user_id: number;
            description: string | null;
            sqft: number | null;
            capacity: number | null;
            location: string | null;
            address: string | null;
            amenities: string | null;
            availability: string | null;
            price_per_hour: number | null;
            image: string;
        }
    }|null
} 
function calculateTotalHours(checkIn: Date, checkOut: Date): number {
    const diffInMilliseconds = checkOut.getTime() - checkIn.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours;
  }

const SingleBookingInvoice = ({singlebook}:singleProps ) => {
    const{currentUser} = RemoveNullContext()
     const totalHours =  calculateTotalHours(singlebook?.check_in as Date ,singlebook?.check_out as Date)
     const handleDownload = async ()=>{
        const  html2pdf = await require("html2pdf.js")
        const element = document.querySelector("#invoice") as HTMLElement | null
        if(element){
            html2pdf().from(element).set({ filename: 'purchase-invoice.pdf',margin:10,image:{quality:0.98,type:"jpeg"} }).save();
        }else{
            console.log("no item ")
        }
     }
    return (
    <div id='invoice'>
         <div className="flex items-center gap-4">
         <p className="my-2 text-blue-600 text-2xl capitalize font-semibold">invoices</p>
         <span className="bg-blue-600 text-sm font-semibold px-2 py-1 capitalize cursor-pointer rounded-md text-white" onClick={handleDownload} data-html2canvas-ignore> download invoice</span>
         </div>
         <div className="">
            <div className="flex items-center gap-7 mb-2">
            <h1 className="text-lg font-semibold capitalize">{currentUser?.names} </h1>
            <p className="text-sm text-gray-600">{currentUser?.email} </p>
            </div>
            <div className="mb-2 flex items-center">
                <span className="font-semibold text-lg mr-4 capitalize">price_per_hour:</span>
                <span className="text-sm text-gray-600"> {singlebook?.home.price_per_hour}</span>
            </div>
            <div className="mb-2 flex items-center">
                <span className="font-semibold text-lg mr-4 capitalize">capacity:</span>
                <span className="text-sm text-gray-600 flex items-center"> {singlebook?.home.capacity} <p className="ml-2">people</p></span>
            </div>
            <div className="mb-2 flex items-center">
                <span className="font-semibold text-lg mr-4 capitalize">ultilities:</span>
                <span className="text-sm text-gray-600 flex items-center"> {singlebook?.home.amenities} </span>
            </div>
            <div className="table-container">
            <table className="custom-table ">
        <thead>
          <tr>
            <th>Hall Name</th>
            <th>Hall Address</th>
            <th>Price ($)</th>
            <th>Duration (hrs)</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{singlebook?.home.name}</td>
              <td>{singlebook?.home.address}</td>
              <td>{(singlebook?.home.price_per_hour as number *  totalHours ).toFixed(1)}</td>
              <td>{( totalHours).toFixed(1)}</td>
            </tr>
        
        </tbody>
      </table>
      </div>
            <div className="flex items-center mb-3">
                <span className="mr-4 font-semibold text-lg capitalize">check in:</span>
               <span className="mr-4"> {new Date(singlebook?.check_in as Date).toLocaleDateString('en-US', {    year: 'numeric',  month: 'long',    day: 'numeric'  }) } </span>
                 <span className=""><b className='mr-4'>at</b>  { new Date(singlebook?.check_in as Date).toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit'})}</span>
                 </div>
            <div className="flex items-center">
                <span className="mr-4 font-semibold text-lg capitalize">check in:</span>
               <span className="mr-4"> {new Date(singlebook?.check_out as Date).toLocaleDateString('en-US', {    year: 'numeric',  month: 'long',    day: 'numeric'  }) } </span>
                 <span className=""><b className='mr-4'>at</b>  { new Date(singlebook?.check_out as Date).toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit'})}</span>
                 </div>
         </div>
    </div>
  )
}

export default SingleBookingInvoice