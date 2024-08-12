import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./conponents/layout/Layout";
import InvoiceProvider from "./contexts/InvoiceAppContext";
import Editinvoice from "./conponents/Pages/Editinvoice";
import NewInvoice from "./conponents/Pages/NewInvoice";
import Invoicelayout from "./conponents/layout/Invoicelayout";
import ContentLayout from "./conponents/layout/ContentLayout";
import ThemeProvider from "./contexts/ThemeContext";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ContentLayout />,
          children: [
            { path: "", element: null },
            { path: "new", element: <NewInvoice /> },
          ],
        },
        {
          path: "/invoice/:id",
          element: <Invoicelayout />,
          children: [
            { path: "", element: null },
            { path: "edit", element: <Editinvoice /> },
          ],
        },
        // { path: "/invoice/:id/edit", element: <Editinvoice /> },
        // { path: "/new", element: <NewInvoice /> },
      ],
    },
  ]);
  return (
    <InvoiceProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </InvoiceProvider>
  );
}

export default App;
