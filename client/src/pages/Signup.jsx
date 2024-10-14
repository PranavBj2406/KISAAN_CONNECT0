import React, { useState } from 'react';
import Logo from "../assets/icon 2.jpg";
import { FaRegIdCard } from 'react-icons/fa'; // Import email icon
import { MdOutlineCalendarMonth } from "react-icons/md"; //import calender icon
import { BsGenderAmbiguous } from "react-icons/bs";
import { GiUbisoftSun } from "react-icons/gi"; // Ensure this icon exists
import { FaUserPen } from "react-icons/fa6";
import { FaAddressBook } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLandscapeFill } from "react-icons/ri";
import { FaLeaf } from "react-icons/fa6";
import { BsBank } from "react-icons/bs";
import { TbCashBanknote } from "react-icons/tb";
import { SlCompass } from "react-icons/sl";
import { HiReceiptTax } from "react-icons/hi";
import farmer from "../assets/farmer.jpg"

const renderFarmerDetails = () => (
  <div>
    <h2 className="text-lg font-medium font-poppins text-gray-800 pl-8 ml-8 mt-5">Farmer Details</h2>
    <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Farmsize*</h1>
    <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
    <RiLandscapeFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
      <input 
        className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
        type="number" 
        id="farmSize"
        placeholder='Enter size of Farm (in acres)' 
      />
    </div>
    <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Crops growm*</h1>
    <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
    <FaLeaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
    <FaLeaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
      <input 
        className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
        type="text" 
        id="farmSize"
        placeholder='Enter list of crops grown' 
      />
    </div>
  </div>
);

const renderBuyerDetails = () => (
  <div>
    <h2 className="text-lg font-medium font-poppins text-gray-800 pl-8 ml-8 mt-5">Buyer Details</h2>
    <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Type of buyer*</h1>
    <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
    <SlCompass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
      <select 
        className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
        type="text" 
        id="companyName"
        placeholder='Company Name' 
      >
        <option value="">Buyer type</option>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
            <option value="Cooperative">Cooperative</option>   
    </select>      
    </div>


    <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">GST Number*</h1>
    <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
    <HiReceiptTax className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
      <input 
        className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
        type="text" 
        id="purchaseTypes"
        placeholder='Enter GST Number' 
      />
    </div>
  </div>
);

export default function Signup() {
  const [gender, setGender] = useState(''); // State for gender
  const [occupation, setOccupation] = useState('');
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Logo align */}
      <div className='logo flex items-start justify-center'>
        <img src={Logo} alt="KisaanConnect" className="w-48 md:w-64 lg:w-80 -mt-3" />
      </div>
      <div className='Input'>
        <h1 className="text-2xl font-medium font-poppins text-gray-800 pl-8 ml-8 -mt-4">User Details</h1>
        <h1 className="text-1xl font-medium font-poppins text-gray-700 pl-8 pr-8 ml-8 mt-5">Fill Up Details</h1>
      </div>
      <div className="flex-grow overflow-y-auto ">
      <div className="Details">
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Username*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <FaRegIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="text" 
            id="KCN"
            placeholder='Enter Username' 
          />
        </div>
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Aadhar Card*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <GiUbisoftSun className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="number" 
            id="aadhar" // Ensure this ID is unique
            placeholder='Enter Aadhar Card' 
            />
        </div>
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Phone Number*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="text" 
            id="Phonenumber" // Ensure this ID is unique
            placeholder='Enter PhoneNumber' 
            />
        </div>
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Address*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <FaAddressBook  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="text" 
            id="address" // Ensure this ID is unique
            placeholder='Address Details' 
            />
        </div>

        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Date of Birth*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <MdOutlineCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="date" 
            id="DOB"
            placeholder='Enter Kissan card number' 
            />
        </div>

        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Gender*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <BsGenderAmbiguous className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <select
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            onChange={(e) => setGender(e.target.value)}
            id="gender"
            value={gender}
            >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
          
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Occupation*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
        < FaUserPen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <select
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            onChange={(e) => setOccupation(e.target.value)}
            value={occupation}
            id="occupation"
            >
            <option value="">ROLE</option>
            <option value="Farmer">Farmer</option>
            <option value="Buyer">Buyer   </option>
          </select>
        </div>
        {occupation ==='Farmer' && renderFarmerDetails()}
        {occupation === 'Buyer' && renderBuyerDetails()}
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">Bank Account Number*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <BsBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="text" 
            id="AccountNumber"
            placeholder='Enter BankAccount Number' 
          />
        </div>
        <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">IFSC Number*</h1>
        <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
          <TbCashBanknote className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
          <input 
            className='w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none' 
            type="text" 
            id="IFSCNumber"
            placeholder='Enter IFSC Number' 
          />
        </div>
      <button className="text-1xl font-medium font-poppins text-white text-center w-full md:w-1/2 lg:w-1/3 pl-8 pr-3 py-2 ml-16 mt-5 border border-none rounded-3xl bg-green-500 " type='button'>Register</button>
      
      {/* image alignment */}
        <div className='absolute right-0 top-0 bottom-0  w-1/3 overflow-hidden'>       
       
        <img src={farmer} alt="Farmer" classname="w-full h-full rounded-tl-lg  object-center object-cover "></img>
       
        </div>


      </div>
    </div>
  </div>
  );
}
