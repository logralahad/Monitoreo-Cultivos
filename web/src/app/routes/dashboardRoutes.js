import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Plantas from "../pages/Planta/Plantas";
import Variables from "../pages/Variable/Variables";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Variables />,
      },
      {
        path: "/plantas",
        element: <Plantas />,
      },
    ],
  },
  { path: "/", element: <Navigate to="/" /> },
  { path: "*", element: <div>tss te has perdido macho</div> },
]);

export default routes;
