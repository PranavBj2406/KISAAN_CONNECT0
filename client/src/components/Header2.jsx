import React from "react";
import KissanConnect from "../assets/icon 2.jpg";
import { Link } from "react-router-dom";
import profile from "../assets/profile icon.svg";
import chat from "../assets/chat.svg";

export default function Header() {
  return (
    <div className="bg-white shadow-xl">
      <div className="flex justify-between items-center mx-auto p-4">
        <Link to="/dashboard">
          <img
            src={KissanConnect}
            alt="kissanConnect"
            style={{ width: "150px", padding: "5px" }}
          />
        </Link>
        <div>
          <ul
            className="flex  flex-
          row gap-7 font-semibold font-poppins justify-end pr-9"
          >
            <div className="relative group">
              <Link to="/profile" className="">
                <img
                  src={profile}
                  alt=""
                  className="w-[50px]  rounded-full transition-all duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-lime-500 group-hover:ring-4 group-hover:ring-lime-400 group-hover:scale-105"
                ></img>
              </Link>
            </div>

            <div className="relative group">
              <Link to="/profile" className="">
                <img
                  src={chat}
                  alt=""
                  className="w-[50px]  rounded-full transition-all duration-300 ease-in-out group-hover:shadow-md group-hover:shadow-lime-500 group-hover:ring-4 group-hover:ring-lime-400 group-hover:scale-105"
                ></img>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
