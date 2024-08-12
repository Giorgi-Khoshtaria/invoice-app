import img from "/assets/logo.svg";
import moon from "/assets/icon-moon.svg";
import profile from "/assets/image-avatar.jpg";

function Navbar() {
  return (
    <div className=" bg-charcoal flex justify-between  lg:flex-col lg:h-screen">
      <div className=" bg-violet-600 w-[72px] h-[72px] rounded-r-[20px] flex justify-center items-center">
        <a href="/">
          <img src={img} />
        </a>
      </div>
      <div className="flex  justify-center items-center pr-20px  lg:flex-col lg:items-center">
        <img src={moon} />
        <div className="h-full w-[68px] border-solid border-l border-independence ml-[24px] flex justify-center items-center lg:ml-0 lg:border-0 lg:border-solid lg:border-t lg:border-independence lg:pt-6 lg:mt-[21px]">
          <img className="w-8 h-8 rounded-[32px]" src={profile}></img>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
