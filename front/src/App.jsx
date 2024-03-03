import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./_scss/App.scss";
function App() {
  return (
    <div
      className="bg-light d-flex flex-column overflow-scroll position-relative"
      style={{ height: "100vh" }}
    >
      <NavBar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <footer className="bg-dark d-flex justify-content-center p-3 text-white">
        <p>@Kleber Edney R. Santos:</p>
      </footer>
    </div>
  );
}

export default App;
