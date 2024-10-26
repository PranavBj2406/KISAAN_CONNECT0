import React from 'react'
import Logo  from '../assets/icon 2.jpg'



export default function Home() {
  return (
    <div className="logo flex items-start justify-center bg-top ">
    <img
      src={Logo}
      alt="KisaanConnect"
      className="w-48 md:w-64 lg:w-80 -mt-3"
      />
  </div>
  
  )
}
