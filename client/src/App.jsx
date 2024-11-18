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
import Sidebar from "./components/Sidebar";


const header2Routes = ["/dashboard","/contactus"]  //if u want to add future pages just type  /pagename1,/pagename2,
const sidebar2Routes = ["/dashboard","/contactus"]  //if u want to add future pages just type  /pagename1,/pagename2,

function AppContent() {
  const location = useLocation(); // Correct use of useLocation

  const showHeader2 = header2Routes.some(route => 
    route.endsWith('*') 
      ? location.pathname.startsWith(route.replace('*', ''))
      : location.pathname === route
  );

  const showSidebar = sidebar2Routes.some(route =>
    route.endsWith('*')
    ? location.pathname.startsWith(route.replace('*', ''))
    : location.pathname === route
  );

  return (
    <div className="flex flex-col h-screen">

      {!showHeader2 ? <Header /> : <Header2 />}
      <div className="flex flex-1 overflow-hidden">
      {showSidebar && <Sidebar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        </Route>
      </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
