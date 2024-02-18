import Periodo from "../components/Periodo";
import { chamadosDefault, sprintDefault } from "../objects/Defaunds";
import React, { useEffect, useState } from "react";
import GetSprint from "../api/GetSprints";
import PostSprint from "../api/PostSprint";
import { useNavigate, useParams } from "react-router-dom";
import ChamadosList from "../components/edits/ChamadosList";
import ChamadosListMenu from "../components/edits/ChamadosListMenu";
import ChamadosEdit from "../components/edits/ChamadoEdit";
import Calendario from "../components/Calendario";
// export const SprintContext = React.createContext();
import { SprintContext } from "../providers/sprintDb";

export default function SprintConfig() {
  const { id } = useParams();
  const [sprint, setSprint] = useState(new sprintDefault());
  const [chamado, setChamado] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setSprint(GetSprint(id));
    }
  }, []);

  function handleUpdateChamados(chamado) {
    let newSprint = { ...sprint };
    if (chamado.id == undefined) {
      chamado.id = sprint.chamados.length + 1;
      newSprint.chamados.push(chamado);
    } else {
      for (let i = 0; i < newSprint.chamados[i].length; i++) {
        if (newSprint.chamados[i].id == chamado.id) {
          newSprint.chamados[i] = [...chamado];
        }
      }
    }
    setSprint(newSprint);
    PostSprint(newSprint);
    setChamado(undefined);
  }

  function handleEditChamado(chamado) {
    if (chamado == undefined) {
      const newChamado = new chamadosDefault();
      // newChamado.id = sprint.chamados.length + 1;
      setChamado(newChamado);
    } else {
      setChamado(chamado);
    }
  }

  const handleRemoveChamado = (id) => {
    const newSprint = { ...sprint };
    newSprint.chamados = sprint.chamados.filter((elem) => elem.id != id);
    setSprint(newSprint);
    PostSprint(newSprint);
  };

  return (
    <SprintContext.Provider value={{ sprint }}>
      <div
        className="w-100 d-flex bg-dark overflow-hidden text-white"
        style={{ height: "calc(100vh - 150px)", borderRadius: "10px" }}
      >
        <div className="col-8 border border-light position-relative p-5 ">
          <Calendario
          // usuarios={sprint && sprint.usuarios}
          // chamados={sprint && sprint.chamados}
          // periodo={sprint && sprint.periodo}
          // pausa={sprint && sprint.pauses}
          />
        </div>
        <div className="col-4 border border border-light-subtle p-3 bg-light position-relative overflow-hidden shadow-sm">
          <div
            className={`w-100 h-100 position-absolute top-0 p-3 bg-dark position-absolute chamado-edit ${
              chamado != undefined ? "active" : ""
            }`}
          >
            {chamado && (
              <ChamadosEdit
                chamadoEdit={chamado}
                setChamadoEdit={(newChamado) =>
                  handleUpdateChamados(newChamado, chamado)
                }
                usuarios={sprint ? sprint.usuarios : []}
              />
            )}
          </div>
          <ChamadosListMenu addChamado={(chamado) => handleEditChamado()} />
          <div className="w-100 h-100">
            <ChamadosList
              chamados={sprint ? sprint.chamados : []}
              setChamados={(chamados) => handleEditChamado(chamados)}
              removeChamado={(idChmado) => handleRemoveChamado(idChmado)}
            />
          </div>
        </div>
      </div>
    </SprintContext.Provider>
  );
}
