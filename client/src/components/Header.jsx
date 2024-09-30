import React from 'react';
import logo from '../assets/Icon1.png';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div className='bg-white'>
      <div className='flex justify-between items-center mx-auto p-5'>
        <Link to ="/">
      <img src={logo} alt="Ministry of Agriculutre" style={{width: "175px" ,padding:"5px"}}/>
        </Link>
      <ul className='flex gap-4 font-semibold '>
        <Link to ="/">
        <li>Home</li>
        </Link>
        <Link to ="/About">
        <li>About</li>
        </Link>
        <Link to ="/signin">
        <li>Sign in</li>
        </Link>
        <Link to ="/signup">
        <li>Sign Up</li>
        </Link>
        <Link to="/contactus">
        <li>Contact us</li>
        </Link>
      </ul>
      </div>
      </div>
  )
}
