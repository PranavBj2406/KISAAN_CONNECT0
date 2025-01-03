import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1 className='text-4xl font-semibold ml-10 mt-11'>Hello, User😊</h1>
      
      <div className='mt-[50px] ml-7 flex flex-row max-h-screen'>
        <div className='transition ease-in-out border h-[300px] w-[350px] flex justify-center items-center rounded-md bg-slate-300 shadow-xl border-slate-300 hover:scale-105 duration-500'>
          container1
        </div>
        <div className='transition ml-[75px] ease-in-out border h-[350px] w-[450px] flex justify-center items-center rounded-md bg-slate-300 shadow-xl border-slate-300 hover:scale-105 duration-500 relative bottom-[50px] '>
          container1
        </div>
      </div>

    </div>
    
  )
}
