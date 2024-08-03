// InvoiceContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import data from "../data.json";
import { Invoice } from "./types";

interface InvoiceContextProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export const InvoiceContext = createContext<InvoiceContextProps>({
  invoices: [],
  setInvoices: () => {},
});

interface InvoiceProviderProps {
  children: ReactNode;
}

const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(data);

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be within an InvoiceProvider");
  }
  return context;
};
