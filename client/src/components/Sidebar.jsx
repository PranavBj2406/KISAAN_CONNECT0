import React from "react";
import { CircleChevronLeft } from 'lucide-react';

export default function Sidebar({children}) {
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col  border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
            <div className=" flex flex-row">    
            <div className="mt-1 pl-2">
            <span className="text-lg font-semibold text-green-500">OverView</span>
            </div>
            <div>
            <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-8">
            <CircleChevronLeft />
            </button>
            </div>
            </div>
        </div>    

        <ul className="flex-1 px-3"></ul>

        <div className="border-t flex p-3">{children}</div>
        




      </nav>
    </aside>
  );
}
