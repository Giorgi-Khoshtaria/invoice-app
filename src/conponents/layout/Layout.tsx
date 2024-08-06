import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className=" min-h-screen w-full">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
