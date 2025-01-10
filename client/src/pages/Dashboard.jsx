import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className='text-4xl font-semibold ml-10 mt-11'>Hello, User😊</h1>

      <div className='mt-[50px] ml-7 relative grid grid-cols-6 grid-rows-6 gap-2 h-[700px] w-full'>
        {/* Analysis */}
        <div className='col-start-1 col-span-2 row-start-1 row-span-3 transition ease-in-out border flex justify-center items-center rounded-md bg-slate-300 shadow-xl border-slate-300 hover:scale-105 duration-500'>
          Analysis
        </div>
        {/* Order */}
        <div className='col-start-3 col-span-2 row-start-1 row-span-3 transition ease-in-out border flex justify-center items-center rounded-md bg-slate-300 shadow-xl border-slate-300 hover:scale-105 duration-500'>
          Order
        </div>
        {/* Daily Price */}
        <div className='col-start-2 col-span-2 row-start-4 row-span-3 transition ease-in-out border flex justify-center items-center rounded-md bg-slate-300 shadow-xl border-slate-300 hover:scale-105 duration-500'>
          Daily Price
        </div>
        {/* Transactions */}
        <div className='col-start-4 col-span-2 row-start-4 row-span-3 transition ease-in-out border flex justify-center items-center rounded-md bg-slate-300 shadow-xl border-slate-300 hover:scale-105 duration-500'>
          Transactions
        </div>
      </div>
    </div>
  );
}
