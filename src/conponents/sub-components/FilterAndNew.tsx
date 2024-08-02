import React from "react";
import "./FilterAndNew.css"; // Import the CSS file

function FilterAndNew() {
  return (
    <div className="flex items-center justify-between mt-9">
      <div>
        <h2 className="text-2xl font-bold leading-normal tracking-[-0.75px]">
          Invoices
        </h2>
        <p className="text-gray font-medium leading-[15px] tracking-[-0.1px] text-[13px]">
          No invoices
        </p>
      </div>
      <div className="flex items-center gap-[18px] ">
        <div className="flex items-center justify-end ">
          <select className="custom-select text-chineesBlack text-[15px] font-bold tracking-tight focus:outline-none">
            <option value="Filter">Filter</option>
            <option value="paid">Paid</option>
            <option value="Pendding">Pendding</option>
            <option value="draft">Draft</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
          >
            <path
              d="M1 1L5.2279 5.2279L9.4558 1"
              stroke="#7C5DFA"
              stroke-width="2"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-[8px] pt-1.5 pr-[15px] pb-1.5 pl-1.5 bg-violetsBlue rounded-[24px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="16" cy="16" r="16" fill="white" />
            <path
              d="M17.3131 21.0234V17.3136H21.0229V14.7333H17.3131V11.0234H14.7328V14.7333H11.0229V17.3136H14.7328V21.0234H17.3131Z"
              fill="#7C5DFA"
            />
          </svg>
          <p className="text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
            New
          </p>
        </div>
      </div>
    </div>
  );
}

export default FilterAndNew;
