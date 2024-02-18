import React, { useState } from "react";
import { Link } from "react-router-dom";
import GetSprintList from "../api/GetSprintList";
import RemoveSprint from "../api/RemoveSprint";

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
    <>
      <h1>Sprints</h1>
      <div className="d-flex gap-5">
        <Link to={`/config`} className="btn btn-primary">
          Add
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Data Inicio</td>
            <td>Data Final</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {sprints &&
            sprints.map((elem, index) => {
              return (
                <tr key={index}>
                  <td>{elem.id}</td>
                  <td>{elem.dataInicial}</td>
                  <td>{elem.dataFinal}</td>
                  <td>
                    <Link
                      to={`edit/${elem.id}`}
                      className="btn btn-outline-primary"
                    >
                      Editar
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`config/${elem.id}`}
                      className="btn btn-outline-primary"
                    >
                      Config
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleRemove(elem.id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
