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
        return "bg-[rgba(55,59,83,0.0571)]";
      default:
        return "bg-gray-500 bg-opacity-10";
    }
  };

  const getDotColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "draft":
        return "bg-[#373B53]";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "draft":
        return "text-[#373B53]";
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
    deleteInvoice(id);
    navigate("/"); // Redirect to the home page after deletion
  };

  const handleMarkAsPaid = () => {
    markAsPaid(id);
    navigate("/");
  };

  return (
    <div className="">
      <div className=" w-full flex items-center pt-[33px] pr-6 pb-0 pl-6 ">
        <div className="w-full">
          <div>
            <div>
              <a
                href="/"
                className="flex items-center gap-6 text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px] "
              >
                {" "}
                <img src={arrowleft} alt="" /> Go back
              </a>
              <div className=" bg-white rounded-lg flex items-center justify-between mt-[31px] mb-4 pt-6 pr-6 pb-[27px] pl-6">
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
                <div className="hidden sm:flex sm:gap-2">
                  <Link
                    to={`/invoice/${id}/edit`}
                    className=" pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl bg-[#F9FAFE] text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleMarkAsPaid}
                    className="pt-[18px] pr-[28px] pb-[15px] pl-[27px] rounded-3xl bg-violetsBlue text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 pl-6 pb-6 pr-6 rounded-lg bg-white  ">
            <div className=" sm:flex sm:items-center sm:justify-between">
              <div className="mb-[30px]">
                <p className="text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
                  # <span className=" text-chineesBlack ">{invoice.id}</span>
                </p>
                <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] mt-1">
                  {invoice.description}
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 mb-[31px] sm:text-right">
                <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.street}
                </p>
                <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.city}
                </p>
                <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.postCode}
                </p>
                <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  {invoice.senderAddress.country}
                </p>
              </div>
            </div>

            <div className=" mb-[35px]  grid grid-cols-2 sm:grid-cols-3 sm:items-baseline">
              <div>
                <div>
                  <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                    Invoice Date
                  </p>
                  <p className=" mt-[13px] text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {formatDate(invoice.createdAt)}
                  </p>
                </div>
                <div className="mt-[31px]">
                  <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                    Payment Due
                  </p>
                  <p className=" mt-[13px] text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {formatDate(invoice.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <p className=" mb-[13px] text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  Bill To
                </p>
                <div>
                  <p className=" mb-[7px] text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {invoice.clientName}
                  </p>
                  <div className="flex items-start flex-col gap-1">
                    <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.street}
                    </p>
                    <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.city}
                    </p>
                    <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.postCode}
                    </p>
                    <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                      {invoice.clientAddress.country}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className=" mb-[13px] text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] ">
                  Sent to
                </p>
                <div className="mb-[56px]">
                  <p className=" text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                    {invoice.clientEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className=" bg-[#F9FAFE] rounded-lg p-6">
              <div className="mb-6 sm:hidden ">
                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className=" flex items-center justify-between"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <p className=" text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                        {item.name}
                      </p>
                      <p className="text-ube text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                        {" "}
                        {item.quantity}x £ {item.price}
                      </p>
                    </div>
                    <div className=" flex items-center justify-between">
                      <p className="text-chineesBlack text-[15px] font-bold leading-[20px] tracking-[-0.25px] ">
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
                      <th className="p-2 text-left text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        Item Name
                      </th>
                      <th className="p-2 text-right text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        QTY.
                      </th>
                      <th className="p-2 text-right text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        Price
                      </th>
                      <th className="p-2 text-right text-ube text-[13px] not-italic font-medium leading-[18px] tracking-[-0.1px]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {invoice.items.map((item, index) => (
                      <tr key={index} className="">
                        <td className="p-2 text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          {item.name}
                        </td>
                        <td className="p-2  text-ube text-right text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          {item.quantity}
                        </td>
                        <td className="p-2 text-ube text-right text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          £{item.price}
                        </td>
                        <td className="p-2 text-right text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                          £{item.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#373B53] p-6 rounded-b-lg mt-[39px]">
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
          <div className="flex items-center justify-between  w-full h-[91px]  bg-white p-6 sm:hidden">
            <Link
              to={`/invoice/${id}/edit`}
              className=" pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl bg-[#F9FAFE] text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
            >
              Delete
            </button>
            <button
              onClick={handleMarkAsPaid}
              className="pt-[18px] pr-[28px] pb-[15px] pl-[27px] rounded-3xl bg-violetsBlue text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-md w-[90%] max-w-[327px] sm:max-w-[480px]">
            <h1 className=" mb-2 text-chineesBlack text-2xl not-italic font-bold leading-8 tracking-[-0.5px]">
              Confirm Deletion
            </h1>
            <p className=" text-ube mb-[22px]text-2xl not-italic font-bold leading-8 tracking-[-0.5px]">
              Are you sure you want to delete invoice {invoice.id} This action
              cannot be undone.
            </p>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl bg-[#F9FAFE] text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]"
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
