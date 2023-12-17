import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Sprint from "./pages/Sprint.jsx";
import Users from "./pages/User.jsx";
import { SprintProvider } from "./providers/sprintDb.jsx";
import { UsuarioProvider } from "./providers/UsuarioDb.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "sprint",
        element: <Sprint />,
      },
      {
        path: "user",
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SprintProvider>
      <UsuarioProvider>
        <RouterProvider router={router} />
      </UsuarioProvider>
    </SprintProvider>
  </React.StrictMode>
);
