import React from "react";
import FilterAndNew from "../sub-components/FilterAndNew/FilterAndNew";
import ClearContent from "../sub-components/ClearContent.tsx/ClearContent";
import InvoiceContent from "../sub-components/invoicecontect/InvoiceContent";
import { useInvoice } from "../../contexts/InvoiceAppContext";

const Content: React.FC = () => {
  const { invoices, filterStatus } = useInvoice();

  const filteredInvoices =
    filterStatus === "all"
      ? invoices
      : invoices.filter((invoice) => invoice.status === filterStatus);

  return (
    <div className="w-full px-[20px]">
      <FilterAndNew />
      <div className="mt-8 w-full">
        {filteredInvoices.length === 0 ? (
          <ClearContent />
        ) : (
          filteredInvoices.map((invoice) => (
            <InvoiceContent
              key={invoice.id}
              id={invoice.id}
              clientName={invoice.clientName}
              due={new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              total={invoice.total.toFixed(2)}
              status={invoice.status}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
