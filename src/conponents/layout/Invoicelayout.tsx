import React from "react";
import { Outlet } from "react-router-dom";
import InvoicePage from "../Pages/InvoicePage";

function Invoicelayout() {
  return (
    <div className=" relative">
      <InvoicePage />
      <Outlet />
    </div>
  );
}

export default Invoicelayout;
