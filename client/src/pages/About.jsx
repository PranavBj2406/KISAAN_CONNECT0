import React from "react";
import emp from "../assets/emp.jpeg"
import vec from "../assets/Vector.svg"

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="w-full flex flex-row">
      
        <h1 className="text-7xl font-montserrat font-bold  text-start mt-20 pt-20 ml-20 pl-20 ">
          About Us
        </h1>
        <div className="absolute ml-20 mt-4">
        <img src={vec} alt="vector" className="mt-20 pt-12 w-[350px]"></img>
        </div>
      </div>

      <div className="pt-10">
        <div className="w-1/2 ml-20 mt-20">
          <h1 className="text-3xl font-semibold text-emerald-600 ">
            Who we are :{" "}
          </h1>
          <p className="mt-5 ml-1 pr-1">
            Welcome to Kisaan Connect, a platform dedicated to empowering
            farmers and buyers through seamless contract farming solutions. Our
            mission is to bridge the gap between farmers and markets, ensuring a
            fair and transparent process where both parties benefit. We provide
            an innovative space where farmers can secure buyers for their
            produce before the planting season, reducing financial risks and
            ensuring a guaranteed market. Buyers, on the other hand, gain access
            to fresh, quality produce straight from the source, fostering trust
            and long-term relationships. 
          </p>
        </div>
      </div>
    </div>
  );
}
