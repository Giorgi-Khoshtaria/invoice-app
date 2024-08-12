import React, { useState } from "react";
import delate from "/assets/icon-delete.svg";
import { v4 as uuidv4 } from "uuid";
import { useInvoice } from "../../contexts/InvoiceAppContext";
import { useNavigate } from "react-router-dom";
// Adjust import as needed
import { Invoice, Item } from "../../contexts/types";
import arrowleft from "/assets/icon-arrow-left.svg";
const generateRandomCharacter = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

const generateRandomId = (): string => {
  const randomPrefix = generateRandomCharacter(); // Generate a random character
  const uuid = uuidv4().replace(/-/g, "").slice(0, 6); // Get the first 6 characters of the UUID, removing dashes
  return `${randomPrefix}${uuid}`;
};

// Example usage
const newId = generateRandomId();
console.log(newId);
const initialFormData: Invoice = {
  id: newId,
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientName: "",
  clientEmail: "",
  invoiceDate: "",
  paymentTerms: 0,
  description: "",
  items: [],
  createdAt: new Date().toISOString(),
  paymentDue: new Date().toISOString(),
  status: "pending",
  total: 0,
};

function NewInvoice() {
  const [formData, setFormData] = useState<Invoice>(initialFormData);
  const { newInvoice } = useInvoice();
  const navigate = useNavigate();

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    addressType: "clientAddress" | "senderAddress"
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [addressType]: {
        ...prevState[addressType],
        [name]: value,
      },
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    if (formData) {
      const updatedItems = formData.items.map((item, i) => {
        if (i === index) {
          const updatedItem = {
            ...item,
            [field]:
              field === "quantity" || field === "price"
                ? typeof value === "string"
                  ? Number(value) // Convert to number
                  : value
                : value,
          };

          // Recalculate total for the item
          if (field === "quantity" || field === "price") {
            const quantity = Number(updatedItem.quantity) || 0;
            const price = Number(updatedItem.price) || 0;
            updatedItem.total = quantity * price;
          }

          return updatedItem;
        }
        return item;
      });

      setFormData((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    }
  };

  const handleAddItem = () => {
    if (formData) {
      const newItem: Item = {
        name: "",
        quantity: "", // Initialize to 0
        price: "", // Initialize to 0
        total: 0,
      };

      setFormData((prevState) => ({
        ...prevState!,
        items: [...prevState!.items, newItem],
      }));
    }
  };

  const handleDeleteItem = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      items: prevState.items.filter((_, i) => i !== index),
    }));
  };

  const handleDiscard = () => {
    setFormData(initialFormData);
  };

  const handleSaveAsDraft = () => {
    const draftInvoice = { ...formData, status: "draft" };
    newInvoice(draftInvoice);
    navigate("/");
  };

  const handleSaveAndSend = () => {
    newInvoice(formData);
    console.log(formData);
    navigate("/");
  };
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };
  const handleNewShow = () => {
    navigate(`/`);
  };
  // const formatPaymentTerms = (days: number): string => {
  //   return `Net ${days} Days`;
  // };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // e.target.value = "10/10/2024";
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "paymentTerms" ? Number(value) : value,
      [name]: name === "invoieDate" ? formatDate(value) : value,
    }));
  };
  return (
    <div>
      <div
        onClick={handleNewShow}
        className="absolute top-[72px] w-full  flex items-start justify-start bg-black h-screen  bg-opacity-50 z-10"
      ></div>
      <div className=" absolute top-[72px] w-full max-w-lg bg-white p-6 z-30 rounded-lg  sm:h-screen sm:overflow-auto ">
        <a
          href="/"
          className=" w-24 flex items-center gap-5 text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px] "
        >
          {" "}
          <img src={arrowleft} alt="" /> Go back
        </a>
        <h1 className="text-2xl not-italic font-bold leading-8 tracking-[-0.5px] mb-[22px] mt-[26px]">
          New Invoice
        </h1>
        <form>
          <div>
            <h2 className="text-violetsBlue text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] mb-6">
              Bill From
            </h2>
            <div className="mb-4 flex flex-col items-start">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.senderAddress.street}
                onChange={(e) => handleAddressChange(e, "senderAddress")}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className=" sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="flex items-center justify-between gap-[23px]">
                <div className="mb-4">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.senderAddress.city}
                    onChange={(e) => handleAddressChange(e, "senderAddress")}
                    className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    Post Code
                  </label>
                  <input
                    type="text"
                    name="postCode"
                    value={formData.senderAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "senderAddress")}
                    className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.senderAddress.country}
                  onChange={(e) => handleAddressChange(e, "senderAddress")}
                  className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mt-[41px] text-violetsBlue text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] mb-6">
              Bill To
            </h2>
            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Client’s Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Client’s Email
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.clientAddress.street}
                onChange={(e) => handleAddressChange(e, "clientAddress")}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className=" sm:flex sm:items-center sm:justify-between  sm:gap-6">
              <div className="flex items-center justify-between gap-[23px]">
                <div className="mb-4">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.clientAddress.city}
                    onChange={(e) => handleAddressChange(e, "clientAddress")}
                    className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    Post Code
                  </label>
                  <input
                    type="text"
                    name="postCode"
                    value={formData.clientAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "clientAddress")}
                    className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.clientAddress.country}
                  onChange={(e) => handleAddressChange(e, "clientAddress")}
                  className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center flex-col gap-[23px] sm:flex-row">
              <div className="mb-4 w-full">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  Invoice Date
                </label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  Payment Terms
                </label>
                <input
                  type="text"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4 w-full">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Project Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
          </div>

          <h2 className="text-[18px] leading-[32px] tracking-[-0.38px] font-bold text-[#777F98] mt-[55px]">
            Item List
          </h2>
          <div className="mt-4 flex flex-col gap-[16px]">
            {formData.items.map((item, index) => (
              <div key={index} className="flex flex-col gap-[16px]">
                <div className="flex-1">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-[16px]">
                  <div className="flex-1">
                    <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                      Qty.
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                      Price
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                      Total
                    </label>
                    <div className="flex items-center">
                      <span className="text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                        {item.total.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(index)}
                        className="ml-4"
                      >
                        <img src={delate} alt="delete" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddItem}
              className="text-violetsBlue bg-[#F9FAFE] w-full py-[18px] mt-8 rounded-lg text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
            >
              + Add New Item
            </button>
          </div>

          <div className="flex justify-end gap-4 mt-8 bg-white">
            <button
              type="button"
              onClick={handleDiscard}
              className="text-ube bg-[#F9FAFE] py-[18px] px-[15px] rounded-3xltext-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="w-[117px] text-gray bg-[#373B53] py-[18px] px-[10px] rounded-lg text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handleSaveAndSend}
              className="text-white bg-violetsBlue py-[18px] px-[15px] rounded-lg text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
            >
              Save & Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewInvoice;
