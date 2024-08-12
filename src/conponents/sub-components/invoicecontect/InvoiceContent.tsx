import React from "react";
import { useNavigate } from "react-router-dom";

interface InvoiceContentProps {
  id: string;
  clientName: string;
  due: string; // Date string in ISO format
  total: string;
  status: string;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

const InvoiceContent: React.FC<InvoiceContentProps> = ({
  id,
  clientName,
  due,
  total,
  status,
}) => {
  // Function to get the correct background color based on status
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500 bg-opacity-10";
      case "pending":
        return "bg-yellow-500 bg-opacity-10";
      case "draft":
        return "bg-[rgba(55, 59, 83, 0.1)] dark:bg-[rgba(223, 227, 250, 0.1)]";
      default:
        return "bg-gray-500 bg-opacity-10";
    }
  };

  // Function to get the correct dot color based on status
  const getDotColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "draft":
        return "bg-[#373B53] dark:bg-[#DFE3FA]";
      default:
        return "bg-gray-500";
    }
  };

  // Function to get the correct text color based on status
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "draft":
        return "text-[#373B53] dark:text-[#DFE3FA]";
      default:
        return "text-gray-500";
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/invoice/${id}`);
  };

  return (
    <div className="">
      {/* Mobile view */}
      <div
        onClick={handleClick}
        className="hover:border-1 hover:border-violetsBlue hover:border-1 w-full flex items-center flex-col bg-white dark:bg-yankeesBlue rounded-lg pt-[25px] pr-[24px] pb-[22px] pl-[24px] mb-4 sm:hidden"
      >
        <div className="w-full flex items-center justify-between mb-6">
          <p className="text-ube text-[15px] font-bold tracking-[-0.25px]">
            # <span className="text-chineesBlack dark:text-white">{id}</span>
          </p>
          <p className="text-[13px] text-gray dark:text-white">{clientName}</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-gray text-[13px] font-medium mb-2 dark:text-lavender">
              Due {formatDate(due)}
            </p>
            <p className="text-chineesBlack text-[15px] font-bold dark:text-white">
              £ {total}
            </p>
          </div>
          <div
            className={`flex items-center justify-center ${getStatusBgColor(
              status
            )} w-[104px] h-[40px] flex-shrink-0 rounded-md`}
          >
            <div
              className={`w-[8px] h-[8px] rounded-full ${getDotColor(
                status
              )} mr-2`}
            />
            <p
              className={`${getStatusTextColor(
                status
              )} text-[13px] font-medium truncate`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Tablet and larger screens */}
      <div className="hidden sm:flex sm:w-full hover:border-1 hover:border-violetsBlue">
        <div
          onClick={handleClick}
          className="w-full flex items-center bg-white dark:bg-yankeesBlue rounded-lg pt-[25px] pr-[24px] pb-[22px] pl-[24px] mb-4"
        >
          <div className="flex-1 flex items-center justify-between">
            <p className="text-ube text-[15px] font-bold tracking-[-0.25px] mr-4">
              # <span className="text-chineesBlack dark:text-white">{id}</span>
            </p>
            <p className="text-gray text-[13px] font-medium mr-4 dark:text-lavender">
              Due {formatDate(due)}
            </p>
            <p className="text-gray text-[13px] font-medium mr-4 dark:text-white">
              {clientName}
            </p>
            <p className="text-chineesBlack text-[15px] font-bold mr-4 dark:text-white">
              £ {total}
            </p>
            <div
              className={`flex items-center justify-center ${getStatusBgColor(
                status
              )} w-[104px] h-[40px] rounded-md`}
            >
              <div
                className={`w-[8px] h-[8px] rounded-full ${getDotColor(
                  status
                )} mr-2`}
              />
              <p
                className={`${getStatusTextColor(
                  status
                )} text-[13px] font-medium truncate`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceContent;
