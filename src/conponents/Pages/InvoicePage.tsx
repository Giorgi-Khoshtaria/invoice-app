import { useParams, useNavigate } from "react-router-dom";
import { useInvoice } from "../../contexts/InvoiceAppContext";
import arrowleft from "/assets/icon-arrow-left.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function InvoicePage() {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };
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
  const { id } = useParams<{ id: string }>();
  const { invoices, deleteInvoice, markAsPaid } = useInvoice();
  const [showModal, setShowModal] = useState(false);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const handleDelete = () => {
    if (id) {
      deleteInvoice(id);
      navigate("/"); // Redirect to the home page after deletion
    } else {
      // Handle the case where id is undefined
      console.error("Invoice ID is undefined");
    }
  };

  const handleMarkAsPaid = () => {
    if (id) {
      markAsPaid(id);
      navigate("/");
    } else {
      // Handle the case where id is undefined
      console.error("Invoice ID is undefined");
    }
  };

  return (
    <div className="">
      <div className=" w-full flex items-center flex-col pt-[33px] pr-6 pb-0 pl-6 ">
        <div className="w-full">
          <div>
            {" "}
            <a
              href="/"
              className=" w-24 flex items-center gap-5 text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px] dark:text-white"
            >
              {" "}
              <img src={arrowleft} alt="" /> Go back
            </a>
            <div>
              <div className="dark:bg-yankeesBlue bg-white rounded-lg flex items-center justify-between mt-[31px] mb-4 pt-6 pr-6 pb-[27px] pl-6">
                <div className=" w-full flex items-center justify-between gap-[20px] sm:justify-start">
                  <p className="text-[13px] font-medium text-gray tracking-[-0.1px] leading-[15px] ">
                    Status
                  </p>
                  <div
                    className={`flex items-center justify-center ${getStatusBgColor(
                      invoice.status
                    )} w-[104px] h-[40px] flex-shrink-0 rounded-md`}
                  >
                    <div
                      className={`w-[8px] h-[8px] rounded-full ${getDotColor(
                        invoice.status
                      )} mr-2`}
                    />
                    <p
                      className={`${getStatusTextColor(
                        invoice.status
                      )} text-[13px] font-medium truncate`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:justify-between sm:gap-2 sm:w-full">
                  <Link
                    to={`/invoice/${id}/edit`}
                    className="hover:bg-white h-12 pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl bg-[#F9FAFE] text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className=" hover:bg-pink h-12 pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleMarkAsPaid}
                    className=" hover:bg-semiVioletsBlue w-[131px] pt-[18px]  pb-[15px] rounded-3xl bg-violetsBlue text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 pl-6 pb-6 pr-6 rounded-lg bg-white dark:bg-yankeesBlue ">
            <div className=" sm:flex sm:items-baseline sm:gap-2 sm:justify-between">
              <div className="mb-[30px]">
                <p className="dark:text-gray text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
                  #{" "}
                  <span className=" text-chineesBlack dark:text-white ">
                    {invoice.id}
                  </span>
                </p>
                <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] mt-1">
                  {invoice.description}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 mb-[31px] sm:text-right">
                <p className="dark:text-lavender  text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.street}
                </p>
                <p className="dark:text-lavender  text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.city}
                </p>
                <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.postCode}
                </p>
                <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.country}
                </p>
              </div>
            </div>

            <div className=" mb-[35px]  grid grid-cols-2 sm:grid-cols-3 sm:items-baseline">
              <div>
                <div>
                  <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                    Invoice Date
                  </p>
                  <p className="dark:text-white text-chineesBlack mt-[13px] text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {formatDate(invoice.createdAt)}
                  </p>
                </div>
                <div className="mt-[31px]">
                  <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                    Payment Due
                  </p>
                  <p className="dark:text-white text-chineesBlack mt-[13px] text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {formatDate(invoice.paymentDue)}
                  </p>
                </div>
              </div>
              <div>
                <p className=" mb-[13px] dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  Bill To
                </p>
                <div>
                  <p className="dark:text-white text-chineesBlack mb-[7px] text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {invoice.clientName}
                  </p>
                  <div className="flex items-start flex-col gap-1">
                    <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.street}
                    </p>
                    <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.city}
                    </p>
                    <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.postCode}
                    </p>
                    <p className="dark:text-lavender text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.country}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="dark:text-lavender mt-[35px] mb-[13px] text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  Sent to
                </p>
                <div className="mb-[56px]">
                  <p className="dark:text-white text-chineesBlack text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {invoice.clientEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="dark:bg-semiYankeesBlue bg-[#F9FAFE] rounded-lg p-6">
              <div className="mb-6 sm:hidden ">
                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-between"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <p className="dark:text-white text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                        {item.name}
                      </p>
                      <p className="dark:text-gray text-ube text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                        {" "}
                        {item.quantity}x £ {item.price}
                      </p>
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className="dark:text-white text-chineesBlack text-[15px] font-bold leading-[20px] tracking-[-0.25px] ">
                        £ {item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" hidden sm:block sm:w-full">
                <table className="w-full table-auto border-collapse ">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        Item Name
                      </th>
                      <th className="p-2 text-right dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        QTY.
                      </th>
                      <th className="p-2 text-right dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        Price
                      </th>
                      <th className="p-2 text-right dark:text-lavender  text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="">
                        <td className="p-2 dark:text-white text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          {item.name}
                        </td>
                        <td className="p-2  dark:text-lavender  text-ube text-right text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          {item.quantity}
                        </td>
                        <td className="p-2 dark:text-lavender  text-ube text-right text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          £{item.price}
                        </td>
                        <td className="p-2 text-right dark:text-white text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          £{item.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dark:bg-chineesBlack bg-[#373B53] p-6 rounded-b-lg mt-[39px]">
                <div className="flex items-center justify-between">
                  <p className=" text-white text-[13px] font-medium leading-[15px] tracking-[-0.1px]">
                    Grand Total
                  </p>
                  <p className=" text-white text-[20px] font-bold leading-[32px] tracking-[-0.42px]">
                    £ {invoice.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Actions */}
        </div>
        <div className="flex items-center justify-between  w-screen p-6 h-[91px] dark:bg-yankeesBlue bg-white mt-14 sm:hidden">
          <Link
            to={`/invoice/${id}/edit`}
            className=" hover:bg-white pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl bg-[#F9FAFE] text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="hover:bg-pink pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
          >
            Delete
          </button>
          <button
            onClick={handleMarkAsPaid}
            className="hover:bg-semiVioletsBlue pt-[18px] pr-[28px] pb-[15px] pl-[27px] rounded-3xl bg-violetsBlue text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
          >
            Mark as Paid
          </button>
        </div>
      </div>

      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className=" dark:bg-yankeesBlue bg-white p-6 sm:pt-[51px] sm:pr-12 sm:pb-12 sm:pl-12 rounded-md w-[90%] max-w-[327px] sm:max-w-[480px]">
            <h1 className=" mb-2 dark:text-white text-chineesBlack text-2xl not-italic font-bold leading-8 tracking-[-0.5px]">
              Confirm Deletion
            </h1>
            <p className=" dark:text-lavender text-ube mb-[22px]text-2xl not-italic font-bold leading-8 tracking-[-0.5px]">
              Are you sure you want to delete invoice {invoice.id} This action
              cannot be undone.
            </p>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl dark:bg-semiYankeesBlue bg-[#F9FAFE] dark:text-lavender text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl hover:bg-pink bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoicePage;
