import React, { useState } from "react";
import Logo from "../assets/icon 2.jpg";
import { FaRegIdCard } from "react-icons/fa"; // Import email icon
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
import farmer from "../assets/farmer.jpg";
import { HiReceiptTax } from "react-icons/hi";
import { FaKey } from "react-icons/fa";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";


export default function Signup() 
{
  const [formData, setFormData] = useState({});  
  const [loading,setLoading]=useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestData = {
      username: formData.username,
      aadharCard: formData.aadharCard,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      occupation: formData.occupation,
      bankAccNumber: formData.bankAccNumber,
      ifscNumber: formData.ifscNumber,
      password:formData.password
    };
  
    // Add occupation-specific fields
    if (formData.occupation === 'Farmer') {
      requestData.farmSize = Number(formData.farmSize);
      requestData.cropsGrown = formData.cropsGrown.split(',').map(crop => crop.trim());
    }
  
    if (formData.occupation === 'Buyer') {
      requestData.buyerType = formData.buyerType;
      requestData.gstNumber = formData.gstNumber;
    }
  
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        alert(data.message || 'Error in registration ');
        setLoading(false);
        return;
      }
      
      alert('Registration successful Welcome to kissan connect!');
      setLoading(false);
    } catch (error) {
      alert('Error in registration');
      console.error(error);
      setLoading(false);
    }
  };


  const renderFarmerDetails = () => (
    <div>
      <h2 className="text-lg font-medium font-poppins text-gray-800 pl-8 ml-8 mt-5">
        Farmer Details
      </h2>
      <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
        Farmsize*
      </h1>
      <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
        <RiLandscapeFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <input
          className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
          type="number"
          id="farmSize"
          placeholder="Enter size of Farm (in acres)"
          onChange={handleChange}
        />
      </div>
      <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
        Crops grown*
      </h1>
      <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
        <FaLeaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <input
          className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
          type="text"
          id="cropsGrown"
          placeholder="Enter crops(comma separated)"
          onChange={handleChange}
        />
      </div>
    </div>
  );

  const renderBuyerDetails = () => (
    <div>
      <h2 className="text-lg font-medium font-poppins text-gray-800 pl-8 ml-8 mt-5">
        Buyer Details
      </h2>
      <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
        Type of buyer*
      </h1>
      <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
        <SlCompass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <select
          className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
          type="text"
          id="buyerType"
          placeholder="Company Name"
          onChange={handleChange}
        >
          <option value="">Buyer type</option>
          <option value="Individual">Individual</option>
          <option value="Company">Company</option>
          <option value="Cooperative">Cooperative</option>
        </select>
      </div>

      <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
        GST Number*
      </h1>
      <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
        <HiReceiptTax className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
        <input
          className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
          type="text"
          id="gstNumber"
          placeholder="Enter GST Number"
          onChange={handleChange}


        />
      </div>
    </div>
  );


  return (
    <form className="flex flex-col">
      <div className="min-h-screen flex flex-col relative">
        {/* Logo align */}
        <div className="logo flex items-start justify-center bg-top">
          <img
            src={Logo}
            alt="KisaanConnect"
            className="w-48 md:w-64 lg:w-80 -mt-3"
          />
        </div>
        <div className="Input">
          <h1 className="text-3xl font-semibold font-poppins text-lime-800 pl-8 ml-8 -mt-4">
            User Details
          </h1>
          <h1 className="text-1xl font-semibold font-poppins text-lime-600 pl-8 pr-8 ml-8 mt-5">
            Fill Up Details
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto ">
          <div>
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Username*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <FaRegIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="text"
                id="username"
                placeholder="Enter your Username"
                onChange={handleChange}
              />
            </div>
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Aadhar Card*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <GiUbisoftSun className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="text"
                id="aadharCard" // Ensure this ID is unique
                placeholder="Enter Aadhar Card ID"
                onChange={handleChange}
              />
            </div>
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Phone Number*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="text"
                id="phoneNumber" // Ensure this ID is unique
                placeholder="Enter PhoneNumber"
                onChange={handleChange}
              />
            </div>
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Address*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <FaAddressBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="text"
                id="address" // Ensure this ID is unique
                placeholder="Address Details"
                onChange={handleChange}
              />
            </div>

            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Date of Birth*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <MdOutlineCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="date"
                id="dateOfBirth"
                placeholder="Enter Kissan card number"
                onChange={handleChange}
              />
            </div>

            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Gender*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <BsGenderAmbiguous className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <select
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                onChange={handleChange}
                id="gender"
                value={formData.gender}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Occupation*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <FaUserPen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <select
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
               onChange={handleChange}
                value={formData.occupation}
                id="occupation"
              >
                <option value="">ROLE</option>
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer </option>
              </select>
            </div>
            {formData.occupation === "Farmer" && renderFarmerDetails()}
            {formData.occupation === "Buyer" && renderBuyerDetails()}
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Bank Account Number*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <BsBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="text"
                id="bankAccNumber"
                placeholder="Enter BankAccount Number"
                onChange={handleChange}
              />
            </div>
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              IFSC Number*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <TbCashBanknote className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="text"
                id="ifscNumber"
                placeholder="Enter IFSC Number"
                onChange={handleChange}
              />
            </div>
            <h1 className="text-xs font-medium font-poppins text-gray-400 pl-8 ml-8 mt-5">
              Password*
            </h1>
            <div className="relative w-full md:w-1/2 lg:w-1/3 ml-16 mt-4">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              <input
                className="w-full text-xs font-medium font-poppins placeholder-gray-800 pl-10 pr-3 py-2 border-b-2 border-black focus:border-black focus:outline-none"
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </div>

          

            <button disabled={loading}
            onClick={handleSubmit}
              className="shadow-2xl transtion duration-500 ease-in-out text-1xl font-medium font-poppins text-white text-center w-full md:w-1/2 lg:w-1/3 pl-8 pr-3 py-2 ml-16 mt-5 border border-none rounded-3xl bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-300 focus:ring-opacity-100 
            active:bg-lime-600"
              type="button"
            >
              
              {loading ? 'Registering...':'Register'}
            </button>

            <div className="flex gap-2  w-full mt-5 text-sm font-medium font-poppins pl-[62px]">
              <p>Have an Account?</p>
              <Link to="/signin">
                <span className="text-blue-700">SignIn</span>
              </Link>
            </div>
            {/* image alignment */}
            <div className={styles["image-container"]}>
              {/* <img src={picsart} alt="picsart" classname="w-full h-full rounded-tl-lg  object-center object-cover "> */}
              <img
                src={farmer}
                alt="picsart"
                className="w-full h-full rounded-[20px] object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
