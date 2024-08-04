import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./conponents/layout/Layout";
import Content from "./conponents/Pages/Content";
import InvoiceProvider from "./contexts/InvoiceAppContext";
import IvoicePage from "./conponents/Pages/InvoicePage";
import Editinvoice from "./conponents/Pages/Editinvoice";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Content /> },
        { path: "/invoice/:id", element: <IvoicePage /> },
        { path: "/invoice/:id/edit", element: <Editinvoice /> },
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
