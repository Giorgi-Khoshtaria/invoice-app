import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Invoice } from "./types";
import initialData from "../data.json";

interface InvoiceContextProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  updateInvoice: (updatedInvoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
}

export const InvoiceContext = createContext<InvoiceContextProps>({
  invoices: [],
  setInvoices: () => {},
  filterStatus: "all",
  setFilterStatus: () => {},
  updateInvoice: () => {},
  deleteInvoice: () => {},
  markAsPaid: () => {},
});

interface InvoiceProviderProps {
  children: ReactNode;
}

const localStorageKey = "invoices";

const loadInvoices = (): Invoice[] => {
  const storedInvoices = localStorage.getItem(localStorageKey);
  return storedInvoices ? JSON.parse(storedInvoices) : initialData;
};

const saveInvoices = (invoices: Invoice[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(invoices));
};

const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(loadInvoices);
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

  const deleteInvoice = (id: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  const markAsPaid = (id: string) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "paid" } : invoice
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
        deleteInvoice,
        markAsPaid,
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
