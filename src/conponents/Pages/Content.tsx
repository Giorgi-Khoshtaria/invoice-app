import React from "react";
import FilterAndNew from "../sub-components/FilterAndNew/FilterAndNew";
import ClearContent from "../sub-components/ClearContent.tsx/ClearContent";
import InvoiceContent from "../sub-components/invoicecontect/InvoiceContent";
import { useInvoice } from "../../contexts/InvoiceAppContect";

function Content() {
  const { invoices } = useInvoice();

  return (
    <div className="w-full px-[20px]">
      <FilterAndNew />
      <div className="mt-8 w-full">
        {invoices.length === 0 ? (
          <ClearContent />
        ) : (
          invoices.map(
            (invoice: {
              id: React.Key | null | undefined;
              clientName: string;
              paymentDue: string | number | Date;
              total: number;
              status: string;
            }) => (
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
            )
          )
        )}
      </div>
    </div>
  );
}

export default Content;
