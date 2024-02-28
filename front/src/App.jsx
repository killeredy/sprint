import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="bg-light h-100">
      <NavBar />
      <div className="container-md pt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
