import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/icon 2.jpg";
import klogo from "../assets/icon.jpg";
import styles from "./signin.module.css";
import { useEffect } from "react";
import A from "../assets/aadhar.svg"
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";



export default function Signin() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      sessionStorage.setItem("authToken", data.token);

      navigate("/dashboard");
    } catch (error) {
     dispatch(signInFailure(error));
    }
  };

  return (
    <div className="flex items-center justify-start min-h-screen bg-white pb-4 pl-7">
      <div className="p-5 max-w-lg w-full  rounded-xl shadow-2xl ml-5 -mt-10 ">
        <div className="logo flex justify-center mb-12">
          <img
            src={Logo}
            alt="KisaanConnect"
            className="w-48 md:w-64 lg:w-80 -mt-3"
          />
        </div>
        <div className="flex gap-2 mb-2 font-medium">
          <p>Welcome to</p>
          <span className="text-lime-500 font-semibold">KissanConnect</span>
        </div>
        <h1 className="text-3xl text-start font-semibold font-poppins mb-6">
          Sign In
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 font-medium text-sm"
        >
          <div className="flex flex-row gap-1">
          <img src={A} alt="" className="-mt-[2px]"></img>
          <p className="text-lime-600 font-medium text-xs">
            SignIn with Aadharcard
          </p>
          </div>
          
          <input
            type="text"
            placeholder="AadharCard"
            id="aadharCard"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-600 text-1xl"
            onChange={handleChange}
          />
          <p className="text-lime-600 font-medium text-xs">
            Enter your Password
          </p>
          
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-600 text-1xl"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="transition duration-300 ease-in-out bg-lime-600 hover:bg-lime-700 transform hover:translate-y-0 hover:scale-500  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-50 w-full ml-auto "
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>


        <div className="flex gap-2 mt-5 justify-center font-poppins font-medium text-xs">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <span className="text-blue-500 ">Sign up</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5 text-center'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
      </div>

      
      <div className={styles["image-container"]}>
        {/* <img src={picsart} alt="picsart" classname="w-full h-full rounded-tl-lg  object-center object-cover "> */}
        <img
          src={klogo}
          alt="farmer"
          className="w-full h-full rounded-[19px] mt-12 object-center object-cover"
        />
      </div>
      
    </div>
  );
}
