import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInvoice } from "../../contexts/InvoiceAppContext";
import delate from "/assets/icon-delete.svg";
import { Invoice, Item } from "../../contexts/types";
import "./Invoicecss.css";
import arrowleft from "/assets/icon-arrow-left.svg";

const EditInvoice: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { invoices, updateInvoice } = useInvoice();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Invoice | null>(null);

  useEffect(() => {
    const currentInvoice = invoices.find((inv) => inv.id === id);
    if (currentInvoice) {
      setFormData(currentInvoice);
    }
  }, [id, invoices]);
  const paymentTermsOptions = {
    1: "Net 1 Day",
    7: "Net 7 Days",
    14: "Net 14 Days",
    30: "Net 30 Days",
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };
  const handleTermsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (!prevData) return null;

      return {
        ...prevData,
        [name]: name === "paymentTerms" ? parseInt(value) : value,
      };
    });
  };
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    addressType: "clientAddress" | "senderAddress"
  ) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState!,
        [addressType]: {
          ...prevState![addressType],
          [name]: value,
        },
      }));
    }
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
                  ? value
                  : String(value) // Keep as string
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
        ...prevState!,
        items: updatedItems,
      }));
    }
  };

  const handleDeleteItem = (index: number) => {
    if (formData) {
      const updatedItems = formData.items.filter((_, i) => i !== index);
      setFormData((prevState) => ({
        ...prevState!,
        items: updatedItems,
      }));
    }
  };
  const handleAddItem = () => {
    if (formData) {
      const newItem: Item = {
        name: "",
        quantity: "",
        price: "",
        total: 0,
      };

      setFormData((prevState) => ({
        ...prevState!,
        items: [...prevState!.items, newItem],
      }));
    }
  };

  const handleSave = () => {
    if (formData) {
      updateInvoice(formData);
      navigate(`/invoice/${id}`);
    }
  };
  const handleEditShow = () => {
    navigate(`/invoice/${id}`);
  };
  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div
        onClick={handleEditShow}
        className="absolute top-0  w-full  flex items-start justify-start bg-black h-screen  bg-opacity-50 z-10 "
      ></div>
      <div
        style={{ height: "calc(100vh-72px)" }}
        className=" absolute top-0 w-full max-w-xl bg-white p-6 rounded-lg z-20 sm:h-screen sm:overflow-auto "
      >
        <a
          href="/"
          className=" w-24 flex items-center gap-5 text-chineesBlack text-[15px] font-bold leading-[15px] tracking-[-0.25px] "
        >
          {" "}
          <img src={arrowleft} alt="" /> Go back
        </a>
        <h1 className="text-2xl not-italic font-bold leading-8 tracking-[-0.5px] mb-[22px] mt-[26px]">
          Edit <span className="text-gray">#</span>
          {formData.id}
        </h1>
        <form>
          <div>
            <h2 className="text-violetsBlue text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] mb-6">
              Bill From
            </h2>
            <div className="mb-4 flex flex-col items-start">
              <label className=" text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Street Address
              </label>
              <input
                type="text"
                name="senderAddress"
                value={formData.senderAddress.street}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between gap-[23px]">
              <div className="mb-4">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  City
                </label>
                <input
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress.city}
                  onChange={handleChange}
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
                name=" senderAddress"
                value={formData.senderAddress.country}
                onChange={(e) => handleAddressChange(e, "senderAddress")}
                className=" border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
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
                type="text"
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
                name="country"
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
                    name="clientAddress"
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
                    name="street"
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
          </div>

          <div className="sm:flex sm:items-center sm:justify-between  sm:gap-6">
            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Invoice Date
              </label>
              <input
                type="date"
                name="paymentDue"
                value={formData.paymentDue}
                onChange={handleChange}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Payment Terms
              </label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleTermsChange}
                className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              >
                {Object.entries(paymentTermsOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Project Description
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>

          <h2 className="mb-[22px] text-[#777F98] text-lg not-italic font-bold leading-8 tracking-[-0.375px]">
            Items
          </h2>

          {formData.items.map((item, index) => (
            <div
              key={index}
              className="mb-4 sm:flex sm:items-center sm:justify-between  sm:gap-2"
            >
              <div>
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  Item Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="border border-solid border-[#DFE3FA] mb-[25px] sm:mb-[8px] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>

              <div className=" flex items-center gap-4 ">
                <div className="flex flex-col ">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className=" border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    className="border border-solid border-[#DFE3FA] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col items-start gap-[30px]">
                  <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                    Total
                  </label>
                  <p className="text-gray text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
                    {item.total}
                  </p>
                </div>
                <div
                  className="w-[12.444px] h-4 shrink-0 cursor-pointer"
                  onClick={() => handleDeleteItem(index)}
                >
                  <img src={delate} alt="Delete item" />
                </div>
              </div>
            </div>
          ))}
          <div
            className="flex items-center justify-center my-[50px] cursor-pointer"
            onClick={handleAddItem}
          >
            <p className="text-ube text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px]">
              + Add New Item
            </p>
          </div>
        </form>
        <div className="flex justify-end mt-6 bg-white p-5">
          <button className="pt-[18px] pr-[26px] pb-[15px] pl-26px bg-[#F9FAFE]">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
