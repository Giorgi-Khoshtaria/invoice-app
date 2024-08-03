import React from "react";
import FilterAndNew from "../sub-components/FilterAndNew/FilterAndNew";
import ClearContent from "../sub-components/ClearContent.tsx/ClearContent";

function Content() {
  return (
    <div className=" w-full px-[20px] ">
      <FilterAndNew />
      <ClearContent />
    </div>
  );
}

export default Content;
