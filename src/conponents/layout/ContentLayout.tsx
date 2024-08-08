import React from "react";
import { Outlet } from "react-router-dom";
import Content from "../Pages/Content";

function ContentLayout() {
  return (
    <div>
      <Content />
      <Outlet />
    </div>
  );
}

export default ContentLayout;
