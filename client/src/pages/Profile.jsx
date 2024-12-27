import React, { useState, useEffect } from "react";
import axios from "axios";
import ring from "../assets/vector.svg";
import garden from "../assets/download.jpg";
import { FaPen } from "react-icons/fa6";

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [aadharID, setAadharID] = useState(null);

  useEffect(() => {
    const getPersistedUserData = () => {
      try {
        // Parse the entire persisted root
        const persistedState = JSON.parse(localStorage.getItem("persist:root"));
        console.log("Persisted State:", persistedState);

        // Parse the `user` key
        const userState = JSON.parse(persistedState.user);
        console.log("User State:", userState);

        // Access Aadhaar ID
        const aadharCard = userState.currentUser?.aadharCard;
        console.log("Extracted Aadhaar ID:", aadharCard);

        return aadharCard;
      } catch (err) {
        console.error("Error accessing persisted user data:", err);
        return null;
      }
    };

    const aadhar = getPersistedUserData();
    console.log("Extracted Aadhaar ID:", aadhar);
    setAadharID(aadhar);
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!aadharID) {
        console.warn("No Aadhaar ID available");
        setError(
          "No Aadhaar ID found for the logged-in user. Please log in again."
        );
        setLoading(false);
        return;
      }

      console.log("Fetching user details for Aadhaar ID:", aadharID);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${aadharID}`
        );
        console.log("API Response:", response.data);
        setUserDetails(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (aadharID) {
      fetchUserDetails();
    }
  }, [aadharID]);

  // function to render user specific details taking occupation as an criteria

  const RenderOccupationSpecificDetails = () => {
    if (!userDetails || !userDetails.occupation) return null;

    if (userDetails.occupation === "Buyer") {
      return (
        <div className="border-none mt-10 p-6 w-11/12 mx-auto shadow-lg rounded-lg hover:shadow-lime-600 duration-700">
          <span className="font-bold text-3xl mb-5">Buyer Details 🛒</span>

          <div className="flex flex-row space-x-6">
            {/* Left Side - Details */}
            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex flex-col mt-[50px]">
                <span className="font-semibold text-lg mb-3">
                  Address Details:
                </span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails.address}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">GST Number :</span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.buyerDetails?.gstNumber}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">Buyer Type :</span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.buyerDetails?.buyerType}
                </p>
              </div>

              <div className="flex flex-row gap-8">
                <div>
                  <button className="border-none bg-red-600 h-[50px] w-[150px] text-lg font-semibold text-white rounded-md hover:bg-red-400 duration-700">
                    Sign out
                  </button>
                </div>
                <div>
                  <button className="border-none bg-green-600 h-[50px] w-[150px] text-lg font-semibold text-white rounded-md hover:opacity-80 duration-700 ">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                {userDetails?.farmerDetails?.landImage ? (
                  <img
                    src={userDetails.farmerDetails.landImage}
                    alt="Farm Land"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>

              <div className="flex flex-row">
                <div>
                  <button className="border-none h-[50px] w-[200px] bg-slate-300 mt-6 rounded-lg font-semibold text-lg ">
                    Upload Images
                  </button>
                </div>

                <input type="file"></input>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (userDetails.occupation === "Farmer") {
      return (
        <div className="border-none mt-10 p-6 w-11/12 mx-auto shadow-lg rounded-lg hover:shadow-lime-600 duration-700">
          <span className="font-bold text-3xl mb-5">Farmer Details 🧑🏻‍🌾</span>

          <div className="flex flex-row space-x-6">
            {/* Left Side - Details */}
            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">
                  Address Details:
                </span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails.address}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">Land Size :</span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.farmerDetails?.farmSize}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg mb-3">
                  Crops Grown 🌾:
                </span>
                <p className="font-medium text-md border-none bg-slate-50 h-[50px] flex justify-start pl-2 items-center rounded-md hover:bg-lime-600 hover:text-white duration-500">
                  {userDetails?.farmerDetails?.cropsGrown}
                </p>
              </div>

              <div className="border-none bg-red-600 h-[50px] w-[100px] ">
                <button>Sign out</button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1">
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                {userDetails?.farmerDetails?.landImage ? (
                  <img
                    src={userDetails.farmerDetails.landImage}
                    alt="Farm Land"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-8">
                <div>
                  <button className="border-none bg-red-600 h-[50px] w-[150px] text-lg font-semibold text-white rounded-md hover:bg-red-400 duration-700">
                    Sign out
                  </button>
                </div>
                <div>
                  <button className="border-none bg-green-600 h-[50px] w-[150px] text-lg font-semibold text-white rounded-md hover:opacity-80 duration-700 ">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  // end of the function

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center mt-10">
        <div
          className="border-none shadow-lg w-11/12 h-48 flex flex-row items-center justify-start text-start rounded-xl relative overflow-hidden "
          style={{
            backgroundImage: `url(${garden})`,
            backgroundSize: "100% auto",
            backgroundPosition: "bottom",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent w-3/4 z-10"></div>

          <span className="text-white ml-7 text-5xl font-bold font-montserrat relative z-20">
            User Profile
          </span>
          <img
            src={ring}
            alt=""
            className="w-[300px] relative right-[210px] bottom-[10px] z-20"
          />
        </div>
      </div>

      <div className="p-6 w-11/12 h-auto mx-auto bg-white shadow-lg rounded-lg hover:shadow-xl duration-500 mt-10">
        {loading ? (
          <p className="text-blue-500">Loading...</p>
        ) : error ? (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          userDetails && (
            <div>
              <div className="flex flex-row ">
                <div className="w-1/2 flex justify-end items-center text-center relative right-[240px] ">
                  {/* image container  */}
                  <div className="border-none shadow-lg w-[300px] h-[300px] rounded-3xl bg-lime-400 duration-500 "></div>

                  <div className="border h-[30px] w-[30px] rounded-full flex justify-center items-center bg-gray-500 text-white relative top-[150px] right-[10px] hover:bg-black duration-700">
                    <FaPen />
                  </div>
                </div>

                <div className=" p-4 rounded-md w-1/2 mr-[23px] ">
                  <p className="mb-5">
                    <span className="font-bold text-3xl mt-[10px]">
                      General Info🌞
                    </span>
                  </p>

                  <div className="flex flex-row mb-3">
                    <span className="font-semibold text-xl mt-[10px]">
                      Name :
                    </span>
                    <p className="font-medium text-lg border-none bg-slate-50 w-[286px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500 ">
                      {userDetails.username}
                    </p>
                  </div>
                  <div className="flex flex-row mb-3">
                    <span className="font-semibold text-xl mt-[10px]">
                      Occuption :
                    </span>
                    <p className="font-medium text-lg border-none bg-slate-50 w-[240px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500">
                      {userDetails.occupation}
                    </p>
                  </div>

                  <div className="flex flex-row mb-3">
                    <span className="font-semibold text-xl mt-[10px]">
                      Gender :
                    </span>
                    <p className="font-medium text-lg border-none bg-slate-50 w-[270px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500">
                      {userDetails.gender}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-semibold text-xl mt-[10px]">
                      Contact info:
                    </span>
                    <p className="font-medium text-lg border-none bg-slate-50 w-[223px] h-[50px] flex justify-center items-center rounded-md ml-[10px] hover:bg-lime-600 hover:text-white duration-500">
                      {userDetails.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              {/* User Specific details */}
            </div>
          )
        )}
      </div>
      {RenderOccupationSpecificDetails()}
    </div>
  );
}
