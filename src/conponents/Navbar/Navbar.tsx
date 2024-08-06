import img from "/assets/logo.svg";
import moon from "/assets/icon-moon.svg";
import profile from "/assets/image-avatar.jpg";

function Navbar() {
  return (
    <div className=" bg-charcoal flex justify-between ">
      <div className=" bg-violet-600 w-[72px] h-[72px] rounded-r-[20px] flex justify-center items-center">
        <a href="/">
          <img src={img} />
        </a>
      </div>
      <div className="flex  justify-center items-center pr-20px">
        <img src={moon} />
        <div className="h-full w-[68px] border-solid border-l border-independence ml-[24px] flex justify-center items-center ">
          <img className="w-8 h-8 rounded-[32px]" src={profile}></img>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
