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
  const validateForm = (): boolean => {
    const requiredFields = [
      formData.senderAddress.street,
      formData.senderAddress.city,
      formData.senderAddress.postCode,
      formData.senderAddress.country,
      formData.clientName,
      formData.clientEmail,
      formData.clientAddress.street,
      formData.clientAddress.city,
      formData.clientAddress.postCode,
      formData.clientAddress.country,
      formData.paymentDue,
      formData.paymentTerms,
      formData.description,
    ];

    const allFieldsValid = requiredFields.every((field) =>
      typeof field === "string"
        ? field.trim() !== ""
        : field !== undefined && field !== null
    );

    const itemsValid = formData.items.every(
      (item) =>
        typeof item.name === "string" &&
        item.name.trim() !== "" &&
        typeof item.quantity === "number" &&
        item.quantity > 0 &&
        typeof item.price === "number" &&
        item.price > 0
    );

    return allFieldsValid && itemsValid;
  };

  const handleSaveAsDraft = () => {
    if (formData.items.length === 0) {
      alert("At least one item must be added to the invoice.");
      return;
    }

    if (validateForm()) {
      const draftInvoice = { ...formData, status: "draft" };

      newInvoice(draftInvoice as Invoice);
      navigate("/");
    } else {
      alert("Form validation failed. Please fill in all required fields.");
    }
  };

  const handleSaveAndSend = () => {
    if (formData.items.length === 0) {
      alert("At least one item must be added to the invoice.");
      return;
    }

    if (validateForm()) {
      newInvoice(formData);
      navigate("/");
    } else {
      alert("Form validation failed. Please fill in all required fields.");
    }
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
  const paymentTermsOptions = {
    1: "Net 1 Day",
    7: "Net 7 Days",
    14: "Net 14 Days",
    30: "Net 30 Days",
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // e.target.value = "10/10/2024";
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "paymentTerms" ? parseInt(value) : value,
      [name]: name === "invoieDate" ? formatDate(value) : value,
    }));
  };
  return (
    <div className="flex justify-start items-start overflow-x-hidden">
      <div
        onClick={handleNewShow}
        className="absolute top-[72px] lg:top-0 lg:left-0 w-full flex items-start justify-start bg-black h-full  bg-opacity-50 z-10"
      ></div>
      <div className=" absolute top-[72px] lg:top-0 w-full max-w-lg dark:bg-eerieBlack bg-white p-6 z-30 rounded-lg  sm:h-full sm:overflow-auto ">
        <a
          href="/"
          className=" w-24 flex items-center gap-5 text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px] sm:hidden "
        >
          {" "}
          <img src={arrowleft} alt="" /> Go back
        </a>
        <h1 className=" dark:text-white text-2xl not-italic font-bold leading-8 tracking-[-0.5px] mb-[22px] mt-[26px]">
          New Invoice
        </h1>
        <form>
          <div>
            <h2 className="text-violetsBlue text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] mb-6">
              Bill From
            </h2>
            <div className="mb-4 flex flex-col items-start">
              <label
                htmlFor="senderStreet"
                className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
              >
                Street Address
              </label>
              <input
                id="senderStreet"
                type="text"
                name="street"
                value={formData.senderAddress.street}
                onChange={(e) => handleAddressChange(e, "senderAddress")}
                className="border border-solid dark:border-semiYankeesBlue border-[#DFE3FA] dark:text-white text-chineesBlack dark:bg-yankeesBlue w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className=" sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div className="flex items-center justify-between gap-[23px]">
                <div className="mb-4">
                  <label
                    htmlFor="senderCity"
                    className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                  >
                    City
                  </label>
                  <input
                    id="senderCity"
                    type="text"
                    name="city"
                    value={formData.senderAddress.city}
                    onChange={(e) => handleAddressChange(e, "senderAddress")}
                    className="border border-solid dark:border-semiYankeesBlue border-[#DFE3FA] dark:text-white  text-chineesBlack dark:bg-yankeesBlue w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="senderPostcode"
                    className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                  >
                    Post Code
                  </label>
                  <input
                    id="senderPostcode"
                    type="text"
                    name="postCode"
                    value={formData.senderAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "senderAddress")}
                    className="border border-solid dark:border-semiYankeesBlue border-[#DFE3FA] dark:bg-yankeesBlue  dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="senderCountry"
                  className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                >
                  Country
                </label>
                <input
                  id="senderCountry"
                  type="text"
                  name="country"
                  value={formData.senderAddress.country}
                  onChange={(e) => handleAddressChange(e, "senderAddress")}
                  className=" border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mt-[41px] text-violetsBlue text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] mb-6">
              Bill To
            </h2>
            <div className="mb-4">
              <label
                htmlFor="clientsName"
                className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
              >
                Client’s Name
              </label>
              <input
                id="clientsName"
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientsEmail"
                className=" dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
              >
                Client’s Email
              </label>
              <input
                id="clientsEmail"
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientStreet"
                className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
              >
                Street Address
              </label>
              <input
                id="clientStreet"
                type="text"
                name="street"
                value={formData.clientAddress.street}
                onChange={(e) => handleAddressChange(e, "clientAddress")}
                className="border border-solid border-[#DFE3FA]  dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className=" sm:flex sm:items-center sm:justify-between  sm:gap-6">
              <div className="flex items-center justify-between gap-[23px]">
                <div className="mb-4">
                  <label
                    htmlFor="clientsCity"
                    className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                  >
                    City
                  </label>
                  <input
                    id="clientsCity"
                    type="text"
                    name="city"
                    value={formData.clientAddress.city}
                    onChange={(e) => handleAddressChange(e, "clientAddress")}
                    className="border border-solid border-[#DFE3FA]  dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="clientsPostcode"
                    className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                  >
                    Post Code
                  </label>
                  <input
                    id="clientsPostcode"
                    type="text"
                    name="postCode"
                    value={formData.clientAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "clientAddress")}
                    className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="clientsCountry"
                  className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                >
                  Country
                </label>
                <input
                  id="clientsCountry"
                  type="text"
                  name="country"
                  value={formData.clientAddress.country}
                  onChange={(e) => handleAddressChange(e, "clientAddress")}
                  className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center flex-col gap-[23px] sm:flex-row">
              <div className="mb-4 w-full">
                <label
                  htmlFor="createdAt"
                  className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                >
                  Invoice Date
                </label>
                <input
                  id="createdAt"
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="terms"
                  className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                >
                  Payment Terms
                </label>
                <select
                  id="terms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                >
                  {Object.entries(paymentTermsOptions).map(([key, value]) => (
                    <option
                      className="text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]"
                      key={key}
                      value={key}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="description"
                className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
              >
                Project Description
              </label>
              <input
                id="description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
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
                  <label
                    htmlFor="name"
                    className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                  >
                    Item Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="border border-solid border-[#DFE3FA] mb-[25px] sm:mb-[8px] dark:border-semiYankeesBlue dark:bg-yankeesBlue dark:text-white text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-[16px]">
                  <div className="flex-1">
                    <label
                      htmlFor="quantity"
                      className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                    >
                      Qty.
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className=" border border-solid border-[#DFE3FA] dark:border-semiYankeesBlue  dark:text-white dark:bg-yankeesBlue text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="price"
                      className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]"
                    >
                      Price
                    </label>
                    <input
                      id="price"
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      className="border border-solid dark:border-semiYankeesBlue border-[#DFE3FA] dark:text-white dark:bg-yankeesBlue text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="dark:text-lavender text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                      Total
                    </label>
                    <div className="flex items-center">
                      <p className="text-gray text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                        {item.total}
                      </p>
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

            <div
              className=" w-full dark:bg-semiYankeesBlue bg-[#F9FAFE] pt-[18px] pb-[15px] rounded-3xl flex items-center justify-center my-[50px] cursor-pointer"
              onClick={handleAddItem}
            >
              <p className="text-ube dark:text-lavender text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                + Add New Item
              </p>
            </div>
          </div>

          <div className="flex justify-end sm:justify-between gap-4 mt-8 bg-white dark:bg-eerieBlack">
            <button
              type="button"
              onClick={handleDiscard}
              className="text-ube bg-[#F9FAFE] py-[18px] px-[15px] rounded-3xl text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
            >
              Discard
            </button>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleSaveAsDraft}
                className="w-[117px] text-gray bg-[#373B53] py-[18px] px-[10px] rounded-3xl text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handleSaveAndSend}
                className="text-white bg-violetsBlue py-[18px] px-[15px] rounded-3xl text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] focus:outline-none"
              >
                Save & Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewInvoice;
