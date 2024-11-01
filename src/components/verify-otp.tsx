"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const VeriftyOtpCode = () => {
    const [otp, setOtp] = useState({ digit1: '', digit2: '', digit3: '', digit4: '' });
    const[loading,setLoading]= useState(false)
    const router = useRouter()

    const handleChange = (e:any, name:string) => {
        const value = e.target.value ;
        if (value.length > 1) return; 
        setOtp((prev) => ({ ...prev, [name]: value }));
        if (value && e.target.nextSibling) {
          e.target.nextSibling.focus();
        }
      };

      const handlePaste = (e:React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text');
        const digits = pasteData.split('');
        setOtp({
          digit1: digits[0] || '',
          digit2: digits[1] || '',
          digit3: digits[2] || '',
          digit4: digits[3] || ''
        });
        e.preventDefault();
      };

      const handleVerifyOpt = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    const res =  await fetch(`http://localhost:3000/api/verify-otp`,{method:"PUT",body:JSON.stringify({token:Object.values(otp).join("")})})
    const active = await res.json()
    if(res.ok && active===true ){
        setLoading(false)
        router.push("/login")
    }
      }
  return (
    <div>
        <form onSubmit={handleVerifyOpt} action="" className="">
            <div className="mt-4 mb-8">
                <Image src={"/logo.svg"} alt='' width={60} height={60} className='text-center mx-auto'/>
            <h1 className="text-center font-bold text-2xl ">Kindly Input your Personal code</h1>
                {/* <p className="text-center text-gray-400">Registration less than 15 seconds</p> */}
            </div>
            <div 
            className="flex justify-between mb-8">
            <input type="text"
             className=' border rounded-md w-16 h-16  text-center text-xl appearance-none'
             maxLength={1}
             value={otp.digit1}
             onChange={(e) => handleChange(e, 'digit1')}
             onPaste={handlePaste} 
              />
            <input
             type="text"
             className='w-16 h-16 border rounded-md  text-center text-xl appearance-none  no-spin' 
             maxLength={1}
             value={otp.digit2}
             onChange={(e) => handleChange(e, 'digit2')}
             />
            <input
             type="text" 
             className='w-16 h-16 border rounded-md text-center inputs text-xl appearance-none  no-spin' 
             maxLength={1}
             value={otp.digit3}
             onChange={(e) => handleChange(e, 'digit3')}
             />
            <input 
            type="text"
             className='w-16 h-16 border rounded-md text-center text-xl inputs appearance-none'
             maxLength={1}
             value={otp.digit4}
             onChange={(e) => handleChange(e, 'digit4')}
             />
            </div>
            <button disabled={loading} className='disabled:cursor-not-allowed w-full py-3 cursor-pointer bg-blue-600 text-white font-semibold capitalize rounded-md'>{loading?"verifying":"verify email"}</button>
        </form>
    </div>
  )
}

export default VeriftyOtpCode