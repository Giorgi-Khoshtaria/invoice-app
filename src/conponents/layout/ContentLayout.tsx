import { Outlet } from "react-router-dom";
import Content from "../Pages/Content";

function ContentLayout() {
  return (
    <div className="w-full ">
      <Content />
      <Outlet />
    </div>
  );
}

export default ContentLayout;
