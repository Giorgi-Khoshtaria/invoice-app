import React from "react";
import img from "/assets/logo.svg";
import moon from "/assets/icon-moon.svg";
import profile from "/assets/image-avatar.jpg";

function Navbar() {
  return (
    <div className=" bg-[#373B53] flex justify-between">
      <div className=" bg-violet-600 w-[72px] h-[72px] rounded-r-[20px] flex justify-center items-center">
        <img src={img} />
      </div>
      <div className="flex  justify-center items-center">
        <img src={moon} />
        <div className="h-full w-[68px] border-solid border-l border-[#494E6E] ml-[24px] flex justify-center items-center ">
          <img className="w-8 h-8 rounded-[32px]" src={profile}></img>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
