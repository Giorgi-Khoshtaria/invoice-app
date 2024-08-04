import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import data from "../data.json";
import { Invoice } from "./types";

interface InvoiceContextProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  updateInvoice: (updatedInvoice: Invoice) => void;
}

export const InvoiceContext = createContext<InvoiceContextProps>({
  invoices: [],
  setInvoices: () => {},
  filterStatus: "all",
  setFilterStatus: () => {},
  updateInvoice: () => {},
});

interface InvoiceProviderProps {
  children: ReactNode;
}

const localStorageKey = "invoices";

const loadInvoices = (): Invoice[] => {
  const invoices = localStorage.getItem(localStorageKey);
  return invoices ? JSON.parse(invoices) : data;
};

const saveInvoices = (invoices: Invoice[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(invoices));
};

const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(loadInvoices());
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        filterStatus,
        setFilterStatus,
        updateInvoice,
      }}
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
