import { useParams } from "react-router-dom";
import { useInvoice } from "../../contexts/InvoiceAppContect";
import arrowleft from "/assets/icon-arrow-left.svg";

function IvoicePage() {
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
        return "bg-[rgba(55,59,83,0.0571)]"; // Custom background color for draft status
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
        return "bg-[#373B53]"; // Custom dot color for draft status
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
        return "text-[#373B53]"; // Custom text color for draft status
      default:
        return "text-gray-500";
    }
  };
  const { id } = useParams<{ id: string }>();
  const { invoices } = useInvoice();

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }
  return (
    <div>
      <div className=" w-full flex items-center pt-[33px] pr-6 pb-0 pl-6">
        <div className="w-full">
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
          </div>
          <div className="pt-6 pl-6 pb-6 pr-6 rounded-lg bg-white">
            <div className="mb-[30px]">
              <p className="text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
                # <span className=" text-chineesBlack ">{invoice.id}</span>
              </p>
              <p className=" text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px] mt-1">
                {invoice.description}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 mb-[31px]">
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
            <div className=" mb-[35px] flex items-start justify-start gap-16">
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
            </div>
            <div className="mb-[38px]">
              <p className=" mb-[13px] text-ube text-[13px] font-medium leading-[15px] tracking-[-0.1px]">
                Sent to
              </p>
              <p className="text-[15px] font-bold leading-[20px] tracking-[-0.25px]">
                {invoice.clientEmail}
              </p>
            </div>
            <div className=" w-full flex items-start flex-col gap-6 p-6 bg-[#F9FAFE]">
              {invoice.items.map((item) => (
                <div
                  className=" w-full flex items-center justify-between "
                  key={invoice.id}
                >
                  <div>
                    <p className="mb-2 text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
                      {item.name}
                    </p>
                    <p className=" text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
                      {item.quantity}x £{item.price}
                    </p>
                  </div>
                  <p className="text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
                    £ {item.total}
                  </p>
                </div>
              ))}
            </div>
            <div className=" rounded-custom-br  flex items-center justify-between p-6 bg-charcoal">
              <p className=" text-white text-[13px] font-medium leading-[18px] tracking-[-0.1px]">
                Grand Total
              </p>
              <p className="text-white text-2xl font-bold leading-[32px] tracking-[-0.5px]">
                £{invoice.total}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-14 flex items-center justify-between p-6 bg-white">
        <button className=" pt-[18px] pr-[23px] pb-[15px] pl-6 rounded-3xl bg-[#F9FAFE] text-ube text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
          Edit
        </button>
        <button className="pt-[18px] pr-[25px] pb-[15px] pl-6 rounded-3xl bg-fireOpal text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
          Delete
        </button>
        <button className="pt-[18px] pr-[28px] pb-[15px] pl-[27px] rounded-3xl bg-violetsBlue text-white text-[15px] font-bold leading-[15px] tracking-[-0.25px]">
          Mark as Paid
        </button>
      </div>
    </div>
  );
}

export default IvoicePage;
