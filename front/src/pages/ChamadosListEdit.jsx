import React, { useState, useEffect } from "react";
import { GetChamadosLocalList } from "../api/GetChamadosLocalList";
import { PostChamadosListLocal } from "../api/PostChamadosListLocal";
import Papa from "papaparse"; // Biblioteca para fazer o parse do CSV

export default function ChamadosListEdit() {
  const [chamados, setChamados] = useState();
  const chamadosDb = GetChamadosLocalList();
  const [data, setData] = useState([]);

  if (chamados === undefined && chamadosDb != undefined) {
    setChamados(chamadosDb);
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setData(result.data);
        const newUse = [...chamados];
        let count = chamados.length;

        const listResult = result.data.map((item) => {
          const newEdit = new editChamadoList();
          newEdit.id = count++;
          newEdit.numero = item.numero;
          newEdit.desc = item.descricao;
          newEdit.edit = false;
          return newEdit;
        });

        const newList = chamados.concat(listResult);
        setChamados(newList);
      },
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newUse = [...chamados];
    const newEdit = new editChamadoList();
    newEdit.id = chamados.length + 1;
    newUse.push(newEdit);
    setChamados(newUse);
  };

  const handleEditChamado = (e, index, input) => {
    e.preventDefault();
    const newUse = [...chamados];
    newUse[index][input] = e.target.value;
    setChamados(newUse);
  };

  const handleRemove = (e, index) => {
    e.preventDefault();
    const newUse = chamados.filter((use) => use.id !== index);
    setChamados(newUse);
  };

  const handleHabilitChamado = (e, index) => {
    e.preventDefault();
    const newUse = [...chamados];
    newUse[index].edit = !newUse[index].edit;
    newUse[index].btn = newUse[index].edit ? "Salvar" : "Editar";
    setChamados(newUse);
  };

  const handleSave = (e) => {
    e.preventDefault();
    PostChamadosListLocal(chamados);
  };

  return (
    <>
      <h1>Chamados Config</h1>

      <h3>Import Chamados</h3>
      <input type="file" onChange={handleFileUpload} accept=".csv" />

      <form action="">
        <table className="table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Descrição</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {chamados &&
              chamados.map((elem, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {!elem.edit ? (
                        elem.numero
                      ) : (
                        <input
                          type="text"
                          value={elem.numero}
                          onChange={(e) =>
                            handleEditChamado(e, index, "numero")
                          }
                        />
                      )}
                    </td>
                    <td>
                      {!elem.edit ? (
                        elem.desc
                      ) : (
                        <input
                          type="number"
                          value={elem.desc}
                          onChange={(e) => handleEditChamado(e, index, "desc")}
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={(e) => handleHabilitChamado(e, index)}
                      >
                        {elem.btn}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleRemove(e, elem.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>
          <button className="btn btn-info" onClick={(e) => handleAdd(e)}>
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
    </>
  );
}

class editChamadoList {
  id = "";
  numero = "";
  desc = "";
  btn = "Salvar";
  edit = true;
}
