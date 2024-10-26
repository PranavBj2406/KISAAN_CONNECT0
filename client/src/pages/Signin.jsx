import React from 'react'
import Logo from '../assets/icon 2.jpg'
export default function Signin() {
  return (
    <form>
    {/* <div className="min-h-screen flex flex-col relative"> This is related to scrolling feature */}
      
      {/* Logo align */}
      <div className="logo flex items-start justify-center bg-top ">
        <img
          src={Logo}
          alt="KisaanConnect"
          className="w-48 md:w-64 lg:w-80 -mt-3"
          />
      </div>
      
      {/* </div> ---> scroll bar div */}
    </form>

  )
}
