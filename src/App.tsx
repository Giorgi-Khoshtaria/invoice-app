import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./conponents/layout/Layout";
import Content from "./conponents/Pages/Content";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Content /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
