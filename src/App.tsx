import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./conponents/layout/Layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
