import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import ContactUs from "./pages/Contactus";
import 'typeface-poppins';
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";

const header2Routes = [
  "/dashboard",
  "/contactus",
  // Add future routes here
  // You can also use pattern matching if needed
  // "/admin/*",    // Example: all admin routes
  // "/settings/*"  // Example: all settings routes
];

function AppContent() {
  const location = useLocation(); // Correct use of useLocation

  const showHeader2 = header2Routes.some(route => 
    route.endsWith('*') 
      ? location.pathname.startsWith(route.replace('*', ''))
      : location.pathname === route
  );

  return (
    <>
      {!showHeader2 ? <Header /> : <Header2 />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route element={<PrivateRoutes/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
