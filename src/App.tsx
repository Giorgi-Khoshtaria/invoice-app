import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./conponents/layout/Layout";
import Content from "./conponents/Pages/Content";
import InvoiceProvider from "./contexts/InvoiceAppContect";
import IvoicePage from "./conponents/Pages/IvoicePage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Content /> },
        { path: "/invoice/:id", element: <IvoicePage /> },
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
