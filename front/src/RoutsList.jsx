import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import SprintConfig from "./pages/SprintConfig.jsx";
import SprintList from "./pages/SprintList.jsx";
import Users from "./pages/User.jsx";
import SprintEdit from "./pages/SprintEdit.jsx";
import ChamadosListEdit from "./pages/ChamadosListEdit.jsx";

export const RoutsList = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SprintList />,
      },
      {
        path: "config",
        element: <SprintConfig />,
      },
      {
        path: "/config/:id",
        element: <SprintConfig />,
      },
      {
        path: "edit/:id",
        element: <SprintEdit />,
      },
      {
        path: "user",
        element: <Users />,
      },
      {
        path: "chamados",
        element: <ChamadosListEdit />,
      },
    ],
  },
]);
