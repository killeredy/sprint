import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <div className="container-md pt-5">
        <Outlet />
      </div>
    </>
  );
}

export default App;
