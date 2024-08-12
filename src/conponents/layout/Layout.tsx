import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className=" min-h-screen w-full lg:h-full lg:flex lg:items-start lg:justify-center">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
