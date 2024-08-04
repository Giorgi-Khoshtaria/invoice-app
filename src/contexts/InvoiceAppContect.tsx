import React, { createContext, useState, ReactNode, useContext } from "react";
import data from "../data.json";
import { Invoice } from "./types";

interface InvoiceContextProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const InvoiceContext = createContext<InvoiceContextProps>({
  invoices: [],
  setInvoices: () => {},
  filterStatus: "all",
  setFilterStatus: () => {},
});

interface InvoiceProviderProps {
  children: ReactNode;
}

const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(data);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  return (
    <InvoiceContext.Provider
      value={{ invoices, setInvoices, filterStatus, setFilterStatus }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};
