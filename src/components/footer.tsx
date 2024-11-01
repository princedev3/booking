import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <div>
     <h1 className="flex items-center text-center justify-center text-gray-500 py-4">   &copy; {date} Bookit.</h1>
    </div>
  )
}

export default Footer