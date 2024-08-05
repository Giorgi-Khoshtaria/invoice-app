import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./conponents/layout/Layout";
import Content from "./conponents/Pages/Content";
import InvoiceProvider from "./contexts/InvoiceAppContext";
import IvoicePage from "./conponents/Pages/InvoicePage";
import Editinvoice from "./conponents/Pages/Editinvoice";
import NewInvoice from "./conponents/Pages/NewInvoice";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Content /> },
        { path: "/invoice/:id", element: <IvoicePage /> },
        { path: "/invoice/:id/edit", element: <Editinvoice /> },
        { path: "/new", element: <NewInvoice /> },
      ],
    },
  ]);
  return (
    <InvoiceProvider>
      <RouterProvider router={router} />
    </InvoiceProvider>
  );
}

export default App;
