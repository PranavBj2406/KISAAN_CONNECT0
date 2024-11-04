import React from "react";
import Logo from "../assets/icon 2.jpg";
import { Link } from "react-router-dom";
import fcon from "../assets/flad.jpeg";
import fcon2 from "../assets/k.jpeg";
import fcon3 from "../assets/veg.jpeg";
import fcon4 from "../assets/tru.jpeg";
import fcon5 from "../assets/w.jpg";
import fcon6 from "../assets/n1.jpg";
import fcon7 from "../assets/R.jpeg";
import fcon8 from "../assets/k1.jpeg";
import fcon10 from "../assets/Group710.png";
import fcon11 from "../assets/Group3711.png";
import fcon12 from "../assets/Maskgroup.png";
import fcon13 from "../assets/Group3736.png";
import vector from "../assets/Vector.svg"
import border from "../assets/border.png"

export default function Home() {
  return (
    //  parent div
    <div className="min-h-screen">
      <div className="logo flex items-start justify-center bg-top ">
        <img
          src={Logo}
          alt="KisaanConnect"
          className="w-48 md:w-64 lg:w-80 -mt-3"
        />
      </div>
      <h1 className="text-center text-6xl  mb-5 mt-3 font-montserrat font-[700]">
        {" "}
        Seeding Success{" "}
      </h1>
       
       <div className="flex flex-row justify-center items-center text-center">
      <h1 className="text-center text-6xl  font-montserrat font-[700]">
        {" "}
        Cultivating Trust{" "}
      </h1>
      <img src={vector} alt='' className="absolute h-[200px] w-[300px] ml-[340px]"></img>
       </div>

      <div className="flex flex-row ">
        {/* image container */}
        <div className="transition duration-300 hover:scale-10 hover:-translate-x-2">
          <img
            src={fcon}
            alt="fcon"
            className="relative rounded-md ml-5 h-[202px] top-10 right-12 shadow-2xl shadow-lime-800"
          ></img>
        </div>
        <div className="transition duration-300 hover:scale-10 hover:-translate-y-2">
          <img
            src={fcon2}
            alt="fcon2"
            className="relative rounded-md ml-5 h-[150px] top-20 mt-20 right-6  shadow-2xl shadow-lime-200"
          ></img>
        </div>
        <div className="flex justify-end transition duration-300 hover:scale-10 hover:translate-x-2">
          <img
            src={fcon3}
            alt="fcon3"
            className="relative rounded-md ml-3 h-[130px] top-20   shadow-2xl shadow-lime-600"
          ></img>
        </div>
        <div className="flex justify-end transition duration-300 hover:scale-10 hover:-translate-y-2">
          <img
            src={fcon4}
            alt="fcon3"
            className="relative rounded-md ml-6 h-[200px] top-14 left-16 shadow-2xl shadow-yellow-200"
          ></img>
        </div>
        <div className="flex justify-end transition duration-300 hover:scale-10 hover:translate-x-4">
          <img
            src={fcon5}
            alt="fcon3"
            className="relative rounded-md ml-16 h-[250px] w-[250px ]top-14  left-20 shadow-2xl shadow-green-800"
          ></img>
        </div>
      </div>

      {/* button container */}
      <div className="flex justify-center items-start mt-40 pt-5">
        <Link to="/signin">
          <button className="relative bottom-6 transition duration-300 ease-in-out bg-green-800 hover:bg-lime-600 transform hover:-translate-x-1 hover:scale-110  border border-b-2 w-[200px] h-[40px] rounded-md border-none  text-white font-[500] shadow-2xl shadow-black">
            Get Started
          </button>
        </Link>
      </div>

      <div className="flex flex-row mt-20 pt-">
        <div className="flex justify-end w-1/2 ">
          <img
            src={fcon6}
            alt="fcon6"
            className="rounded-[5px] mr-8 shadow-xl shadow-gray-400 h-[300px]"
          ></img>
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl text-lime-500 font-semibold ">About us</h1>
          <p className="text-left mt-4 w-full font-medium font-montserrat">
            KissanConnect is dedicated to empowering farmers by connecting them
            directly with buyers, expanding market opportunities, and ensuring
            fair access to demand. By bridging the gap between farms and
            markets, we enable farmers to showcase and sell their produce
            directly, while buyers gain reliable access to quality products. By
            leveraging our platform, farmers can expand their reach and connect
            with a wider network of buyers, giving them the chance to showcase
            their hard work and produce without intermediaries. Together, were
            cultivating a more transparent and sustainable agricultural
            ecosystem for a prosperous future.To know more Click
          </p>
          <Link to="/About">
            <button className="border-none w-[200px] h-[40px] mt-6 rounded-md font-[600] bg-lime-600 transform hover:-translate-x-1 hover:scale-10 duration-200 text-white shadow-2xl shadow-black">
              About US
            </button>
          </Link>
        </div>
      </div>

      <h1 className="text-center font-semibold text-xl mt-20 pt-20">
        Powered by
      </h1>
      <div className="flex flex-row mt-20 ml-12">
        <img
          src={fcon7}
          alt="swtach bharat"
          className="h-[200px] w-[200px] ml-12 "
        ></img>
        <img
          src={fcon8}
          alt="swtach bharat"
          className="h-[200px] w-[200px] ml-12"
        ></img>
        <img
          src="https://blog.ipleaders.in/wp-content/uploads/2016/06/make-in-India-logo.jpg"
          alt="make in India"
          className="h-[200px] w-[300px] ml-12 rounded-sm"
        ></img>
        <img
          src="https://th.bing.com/th/id/OIP.rGNcVOIBWYG9yX4GSNktyAHaEK?w=281&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="swtach bharat"
          className="h-auto w-auto ml-12"
        ></img>
        <img
          src="https://th.bing.com/th/id/OIP.Ybo9WvOEou-_AFqhMidIJwHaEw?rs=1&pid=ImgDetMain"
          alt="swtach bharat"
          className="h-[200px] w-[200px] ml-12"
        ></img>
      </div>

      <div className="mt-20">
        <div className="w-1/2">
          <h1 className="text-start text-3xl font-[614] text-green-600 ml-20 pl-20">
            Services
          </h1>
          <h1 className="text-start text-3xl font-[610] text-green-600 ml-20 pl-20 -mt-1">
            We provide ____________
          </h1>
        </div>

        <div className="flex flex-row ml-12 pl-8  mt-12 pt-5">
          <div className="transition duration-300 hover:scale-10 hover:-translate-x-2">
            <div className="absolute left-22 ml-12">
              <img src={fcon10} alt="" className=""></img>
              <h1 className="text-2xl font-semibold ml-12 mt-2 ">Logistics:</h1>
            </div>
            <p className="border-none shadow-xl shadow-lime-800 flex items-center justify-center w-[600px] h-[250px] mt-10 ml-20 mr-20 text-center rounded-lg text-md font-medium text-lime-700">
              "Flexible Logistics facilities directly from sellers to buyers"
            </p>
          </div>

          <div>
            <div>
              <img
                src={fcon11}
                alt=""
                className="absolute right-[700px] ml-8 top-[1870px]"
              ></img>
              <h1 className="absolute right-[520px] ml-8 top-[1990px] text-2xl font-semibold">
                Smart Agreement:
              </h1>
            </div>
            <p className="border-none shadow-xl shadow-lime-600 flex items-center justify-center w-[600px] h-[250px] -mt-4 ml-20  text-center rounded-lg text-lime-700 text-md font-medium">
              "Smart Agreement system to promote ease of deals "
            </p>
          </div>
        </div>

        <div className="flex flex-row ml-12 pl-8">
          <div className="mt-5 transition duration-300 hover:scale-10 hover:-translate-y-2">
            <div className="absolute left-22 ml-12">
              <img src={fcon13} alt="" className=""></img>
              <h1 className="text-2xl font-semibold ml-12 mt-2 text-">
                Consultation:
              </h1>
            </div>
            <p className="border-none shadow-xl shadow-lime-800 flex items-center justify-center w-[600px] h-[250px] mt-10 ml-20 mr-20 text-center rounded-lg text-md font-medium text-lime-700">
              "Helping Farmers and dealears get the Best deals"
            </p>
          </div>

          <div>
            <div className="">
              <img
                src={fcon12}
                alt=""
                className="absolute right-[710px] ml-8 top-[2220px]"
              ></img>
              <h1 className="absolute right-[640px] ml-8 top-[2290px] text-2xl font-semibold">
                Haulage:
              </h1>
            </div>
            <p className="border-none shadow-xl shadow-lime-600 flex items-center justify-center w-[600px] h-[250px] -mt-4 ml-20  text-center rounded-lg text-lime-700 text-md font-medium">
              "Haulage services provided by all sectors of Transport"
            </p>
          </div>
        </div>
      </div>

      <h1 className="font-montserrat text-3xl font-semibold text-center mt-[70px]">
        Use our Platform and Connect yourself
      </h1>
      <div className="flex justify-center items-start mt-10 pt-5">
        <Link to="/signin">
          <button className="relative bottom-6 transition duration-300 ease-in-out bg-green-800 hover:bg-lime-600 transform hover:-translate-x-1 hover:scale-110  border border-b-2 w-[200px] h-[40px] rounded-md border-none  text-white font-[500] shadow-2xl shadow-black">
            CONNECT
          </button>
        </Link>
      </div>
      <img src={border} alt='' className="w-full h-[60px]">
      </img>
    </div>
  );
}
