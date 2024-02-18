import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import SprintConfig from "./pages/SprintConfig.jsx";
import SprintList from "./pages/SprintList.jsx";
import Users from "./pages/User.jsx";
import SprintEdit from "./pages/SprintEdit.jsx";

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
    ],
  },
]);
