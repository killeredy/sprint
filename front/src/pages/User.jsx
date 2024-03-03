import React, { useState, useEffect } from "react";
import { PostUsers } from "../api/PostUsers";
import { GetUsersLocalList } from "../api/GetUsersLocalList";
import { PostUsersLocal } from "../api/PostUsersLocal";

export default function Users() {
  const [usuarios, setUsuarios] = useState();
  const usuariosDb = GetUsersLocalList();

  if (usuarios === undefined && usuariosDb != undefined) {
    setUsuarios(usuariosDb);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    const newUse = [...usuarios];
    newUse.push({
      id: usuarios.length + 1,
      nome: "",
      matricula: "",
      btn: "Salvar",
      edit: true,
    });
    setUsuarios(newUse);
  };

  const handleEditUser = (e, index, input) => {
    e.preventDefault();
    const newUse = [...usuarios];
    newUse[index][input] = e.target.value;
    setUsuarios(newUse);
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    const newUse = usuarios.filter((use) => use.id !== index);
    setUse(newUse);
  };

  const handleHabilitUser = (e, index) => {
    e.preventDefault();
    const newUse = [...usuarios];
    newUse[index].edit = !newUse[index].edit;
    newUse[index].btn = newUse[index].edit ? "Salvar" : "Editar";
    setUsuarios(newUse);
  };

  const handleSave = (e) => {
    e.preventDefault();
    PostUsersLocal(usuarios);
  };

  return (
    <div className="container mx-auto mt-5">
      <h3>Users Config</h3>

      <form action="" className="p-3 bg-white p-3 rounded mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>NOME</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {usuarios &&
              usuarios.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {!elem.edit ? (
                        elem.nome
                      ) : (
                        <input
                          type="text"
                          value={elem.nome}
                          onChange={(e) => handleEditUser(e, index, "nome")}
                        />
                      )}
                    </td>
                    <td>
                      {!elem.edit ? (
                        elem.matricula
                      ) : (
                        <input
                          type="number"
                          value={elem.matricula}
                          onChange={(e) =>
                            handleEditUser(e, index, "matricula")
                          }
                        />
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-3 w-100 justify-content-end">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => handleHabilitUser(e, index)}
                        >
                          {elem.btn}
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleRemove(e, elem.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <button className="btn btn-success" onClick={(e) => handleAdd(e)}>
            Adicionar
          </button>
        </div>

        <div className="d-flex gap-2 mt-5">
          <button className="btn btn-success" onClick={(e) => handleSave(e)}>
            Salvar
          </button>
          <button className="btn btn-warning" onClick={(e) => handleCancel(e)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
