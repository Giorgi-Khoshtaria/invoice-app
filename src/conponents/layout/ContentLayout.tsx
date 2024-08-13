import { Outlet } from "react-router-dom";
import Content from "../Pages/Content";

function ContentLayout() {
  return (
    <div className="w-full overflow-y-hidden ">
      <Content />
      <Outlet />
    </div>
  );
}

export default ContentLayout;
