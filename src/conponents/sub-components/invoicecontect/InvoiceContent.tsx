// InvoiceContent.tsx
import React from "react";

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
        return "bg-[rgba(55,59,83,0.0571)]"; // Custom background color for draft status
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
        return "bg-[#373B53]"; // Custom dot color for draft status
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
        return "text-[#373B53]"; // Custom text color for draft status
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full flex items-center flex-col bg-white rounded-lg pt-[25px] pr-[24px] pb-[22px] pl-[24px] mb-4">
      <div className="w-full flex items-center justify-between mb-6">
        <p className="text-ube text-[15px] font-bold tracking-[-0.25px]">
          # <span className="text-chineesBlack">{id}</span>
        </p>
        <p className="text-[13px] text-gray">{clientName}</p>
      </div>
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-gray text-[13px] font-medium mb-2">
            Due {formatDate(due)}
          </p>
          <p className="text-chineesBlack text-[15px] font-bold">£ {total}</p>
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
  );
};

export default InvoiceContent;
