import React from "react";
import KissanConnect from "../assets/icon 2.jpg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-white shadow-xl">
      <div className="flex justify-between items-center mx-auto p-5">
        <Link to="/dashboard">
          <img
            src={KissanConnect}
            alt="kissanConnect"
            style={{ width: "160px", padding: "5px" }}
          />
        </Link>
        <div>
          <ul className="flex  flex-
          row gap-7 font-semibold font-poppins justify-end pr-9">
            
            
          </ul>
        </div>
      </div>
    </div>
  );
}
