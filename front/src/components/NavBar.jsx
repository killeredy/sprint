import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
        <div className="container-fluid justify-content-between container">
          <h2 className="text-light">Sprints Manager</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ maxWidth: "max-content" }}
          >
            <ul className="navbar-nav gap-2">
              <Link to="/" className="nav-link text-white h4">
                Sprints
              </Link>
              <li className="nav-item">
                <Link to="/chamados" className="nav-link text-white h4">
                  Chamados
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link text-white h4">
                  Usuários
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
