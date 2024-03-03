import React, { useState } from "react";
import { Link } from "react-router-dom";
import GetSprintList from "../api/GetSprintList";
import RemoveSprint from "../api/RemoveSprint";
import CSVExporter from "../components/CSVExporter";

export default function SprintList() {
  const [sprints, setStrints] = useState();
  const sprintsDb = GetSprintList();

  if (sprints === undefined && sprintsDb != undefined) {
    setStrints(sprintsDb);
  }

  const handleRemove = (sprintId) => {
    let text = "Deseja remover essa sprint?";
    if (confirm(text) == true) {
      const list = RemoveSprint(sprintId);
      setStrints(list);
    }
  };

  return (
    <div className="container-md py-5">
      <div className="d-flex mb-3">
        <h3>Sprints</h3>

        <Link
          to={`/config`}
          className="btn btn-dark d-flex justify-content-center align-items-center rounded-circle ms-3"
          style={{ width: "30px", height: "30px" }}
        >
          +
        </Link>
      </div>
      <div className="bg-white rounded p-4">
        <table className="table">
          <thead>
            <tr>
              <td>
                <h5>Nº</h5>
              </td>
              <td>
                <h5>Data Inicio</h5>
              </td>
              <td>
                <h5>Data Final</h5>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {sprints &&
              sprints.map((elem, index) => {
                console.log(elem);
                return (
                  <tr key={index}>
                    <td>{elem.id}</td>
                    <td>{elem.periodo.inicio}</td>
                    <td>{elem.periodo.final}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <Link
                          to={`edit/${elem.id}`}
                          className="btn btn-outline-secondary"
                        >
                          Editar
                        </Link>
                        <Link
                          to={`config/${elem.id}`}
                          className="btn btn-outline-secondary"
                        >
                          Config
                        </Link>
                        <CSVExporter
                          data={elem.chamados}
                          filename={"tarefasSprint"}
                        />
                        <button
                          onClick={() => {
                            handleRemove(elem.id);
                          }}
                          className="btn btn-outline-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
