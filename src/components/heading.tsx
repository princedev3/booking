import React from 'react'

const Heading = ({title}:{title:string}) => {
  return (
    <div className=' border-b border-gray-300 pb-2 text-2xl font-bold py-10 capitalize'>{title}</div>
  )
}

export default Heading