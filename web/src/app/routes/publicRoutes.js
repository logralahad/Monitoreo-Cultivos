import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "../pages/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
]);

export default routes;
