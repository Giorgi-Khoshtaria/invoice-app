import illustration from "/assets/illustration-empty.svg";

function ClearContent() {
  return (
    <div className=" flex items-center justify-center mt-[42px]">
      <div className="flex items-center flex-col text-center">
        <img src={illustration} alt="" />
        <h2 className=" text-chineesBlack text-2xl font-bold mt-[42px] mb-[22px]">
          There is nothing here
        </h2>
        <p className=" w-[230px] text-gray  font-[13px] tracking-[-0.1px]">
          Create an invoice by clicking the New button and get started
        </p>
      </div>
    </div>
  );
}

export default ClearContent;
