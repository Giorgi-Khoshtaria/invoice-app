import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInvoice } from "../../contexts/InvoiceAppContext";

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAddress: Address;
  senderAddress: Address;
  description: string;
  paymentTerms: string;
  paymentDue: string;
  status: string;
  items: Item[];
}

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
      const updatedItems = formData.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setFormData((prevState) => ({
        ...prevState!,
        items: updatedItems,
      }));
    }
  };

  const handleSave = () => {
    if (formData) {
      updateInvoice(formData);
      navigate(`/invoice/${id}`);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <a
        href="/"
        className=" text-chineesBlack text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] "
      >
        Go back
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
              name="clientName"
              value={formData.clientAddress.street}
              onChange={handleChange}
              className=" text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-[23px]">
            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                City
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.senderAddress.street}
                onChange={handleChange}
                className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                Post Code
              </label>
              <input
                type="text"
                name="street"
                value={formData.senderAddress.postCode}
                onChange={(e) => handleAddressChange(e, "clientAddress")}
                className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Client City
            </label>
            <input
              type="text"
              name="city"
              value={formData.senderAddress.city}
              onChange={(e) => handleAddressChange(e, "clientAddress")}
              className=" text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
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
              name="postCode"
              value={formData.clientName}
              onChange={(e) => handleAddressChange(e, "clientAddress")}
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Client’s Email
            </label>
            <input
              type="text"
              name="country"
              value={formData.clientAddress.country}
              onChange={(e) => handleAddressChange(e, "clientAddress")}
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
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
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-[23px]">
              <div className="mb-4">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  City
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientAddress.city}
                  onChange={handleChange}
                  className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
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
                  className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
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
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Invoice Date
            </label>
            <input
              type="date"
              name="paymentDue"
              value={formData.paymentDue}
              onChange={handleChange}
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Payment Terms
            </label>
            <textarea
              name="description"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Project Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
          </div>
        </div>

        <h2 className="mb-[22px] text-[#777F98] text-lg not-italic font-bold leading-8 tracking-[-0.375px]">
          Items
        </h2>

        {formData.items.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              className="mb-[25px] text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
            />
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
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                  className=" text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
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
                    handleItemChange(index, "price", Number(e.target.value))
                  }
                  className=" text-chineesBlack w-full rounded-lg mt-1 text-[15px] not-italic font-bold leading-[15px] tracking-[-0.25px] pt-[18px] pb-[15px] pl-[20px] focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-ube text-[13px] not-italic font-medium leading-[15px] tracking-[-0.1px]">
                  Total
                </label>
                <p>{item.total}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInvoice;
