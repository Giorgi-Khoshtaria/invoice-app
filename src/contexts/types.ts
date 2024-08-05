// types.ts
export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: string;
  price: string;
  total: number;
}

export interface Invoice {
  invoiceDate: string | number | readonly string[] | undefined;
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}
