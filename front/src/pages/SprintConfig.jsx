import Periodo from "../components/Periodo";
import {
  periodoDefault,
  sprintDefault,
  usuarioDefault,
} from "../objects/Defaunds";
import UsuariosSprint from "../components/UsuariosSprint";
import { useEffect, useState } from "react";
import GetSprint from "../api/GetSprints";
import PostSprint from "../api/PostSprint";
import { useNavigate, useParams } from "react-router-dom";
import BtnOutline from "../components/BtnOutline";
import InputText from "../components/InputText";
import { GetUsers } from "../api/GetUsers";
import ValidadeDate from "../components/ValidadeDate";
import { GetUsersLocalList } from "../api/GetUsersLocalList";

export default function SprintConfig() {
  const { id } = useParams();
  const [sprint, setSprint] = useState();
  const usuarios = GetUsersLocalList();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setSprint(GetSprint(id));
    } else {
      setSprint(new sprintDefault());
    }
  }, []);

  const handleSaveSprint = () => {
    let text = "Deseja Salvar essa sprint?";
    if (confirm(text) == true) {
      PostSprint(sprint);
      navigate("/");
    }
  };

  const handleSetPeriodo = (periodo) => {
    const newSprint = { ...sprint };
    newSprint.periodo = periodo;
    setSprint(newSprint);
  };

  const handleSetDiaria = (e, periodo) => {
    const newSprint = { ...sprint };
    newSprint.jornada[periodo] = e;
    setSprint(newSprint);
  };

  const handleAddPause = () => {
    const newUser = { ...sprint };
    const newPeriod = new periodoDefault();
    newPeriod.id = newUser.pauses.length + 1;
    newUser.pauses.push(newPeriod);
    setSprint(newUser);
  };

  const handleSetPause = (per) => {
    const newSprint = { ...sprint };
    newSprint.pauses[per.index] = per.periodo;
    setSprint(newSprint);
    ValidadeDate(newSprint, periodo);
  };

  const handleRemovePause = (id) => {
    const newSprint = { ...sprint };
    newSprint.pauses = sprint.pauses.filter((elem) => {
      return elem.id != id;
    });
    setSprint(newSprint);
  };

  const handleAddUser = (user) => {
    const newSprint = { ...sprint };
    const newUser = new usuarioDefault();
    newUser.id = user.id;
    newUser.nome = user.nome;
    newSprint.usuarios.push(newUser);
    setSprint(newSprint);
  };

  const handleRemoveUser = (user) => {
    const newSprint = { ...sprint };
    const newUserLis = sprint.usuarios.filter((elem) => elem.id != user.id);
    newSprint.usuarios = newUserLis;
    setSprint(newSprint);
  };

  const handleSetUserSprint = (useId, newUse) => {
    const newSprint = { ...sprint };
    const newUseList = newSprint.usuarios.filter((elem) => elem.id == useId)[0];
    const index = newSprint.usuarios.indexOf(newUseList);
    newSprint.usuarios[index] = newUse;
    setSprint(newSprint);
  };

  // if (sprint) {
  //   console.log(sprint);
  // }

  return (
    <div>
      <div className="row">
        {/* AREA CONFIG */}
        <div className="col-10 p-1">
          <div className="w-100 border rounded p-3">
            {/* CONFIG PERÍODO E JORNADA */}
            <div id="periodo">
              <label htmlFor="" className="mb-2">
                Configurar Período
              </label>
              <div id="content-periodo" className="d-flex gap-2">
                {sprint && (
                  <Periodo
                    value={sprint.periodo}
                    jornada={sprint.jornada}
                    setValue={(e) => handleSetPeriodo(e)}
                    getDesc={false}
                    type="date"
                  />
                )}
                <div>
                  Jornada Diária(horas)
                  <div className="border p-2 d-flex">
                    <InputText
                      label={"Inicio"}
                      type={"number"}
                      max={24}
                      min={0}
                      width={3}
                      value={sprint != undefined && sprint.jornada.inicio}
                      setValue={(e) => handleSetDiaria(e, "inicio")}
                    />

                    <InputText
                      label={"Inicio Almoço"}
                      type={"number"}
                      width={3}
                      value={sprint != undefined && sprint.jornada.inicioAlmoco}
                      setValue={(e) => handleSetDiaria(e, "inicioAlmoco")}
                    />

                    <InputText
                      label={"Retorno Almoço"}
                      type={"number"}
                      width={3}
                      value={sprint != undefined && sprint.jornada.finalAlmoco}
                      setValue={(e) => handleSetDiaria(e, "finalAlmoco")}
                    />

                    <InputText
                      label={"Final"}
                      type={"number"}
                      width={3}
                      value={sprint != undefined && sprint.jornada.final}
                      setValue={(e) => handleSetDiaria(e, "final")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {!sprint ||
            (!sprint.periodo.dataInicial && !sprint.periodo.dataFinal) ? (
              ""
            ) : (
              <>
                <RenderPausesSprint
                  sprint={sprint}
                  handleAddPause={(e) => handleAddPause(e)}
                  handleSetPause={(e) => handleSetPause(e)}
                  handleRemovePause={(e) => handleRemovePause(e)}
                />
                <RenderConfigUser
                  sprint={sprint}
                  usuarios={usuarios}
                  handleAddUser={(e) => handleAddUser(e)}
                  handleSetUserSprint={(e) => handleSetUserSprint(e)}
                  handleRemoveUser={(e) => handleRemoveUser(e)}
                />
              </>
            )}
          </div>
        </div>

        {/* AREA SAVE */}
        <div className="col-2 p-1">
          <div className="p-2 border border-1 shadow rounded">
            <div>
              <button
                className="w-100 my-2 btn btn-primary"
                onClick={() => {
                  handleSaveSprint();
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RenderConfigUser = ({
  sprint,
  usuarios,
  handleAddUser,
  handleSetUserSprint,
  handleRemoveUser,
}) => {
  return (
    <div>
      <label htmlFor="" className="mb-2">
        Usuarios
      </label>
      <div>
        <div className="">
          {usuarios &&
            usuarios.map((elem, i) => {
              return (
                <UsuariosSprint
                  usuarioDb={elem}
                  userSprint={
                    sprint &&
                    sprint.usuarios.filter((us) => us.id == elem.id)[0]
                  }
                  setUserSprint={(newUse) =>
                    handleSetUserSprint(elem.id, newUse)
                  }
                  addUser={(use) => handleAddUser(use)}
                  removeUser={(id) => handleRemoveUser(id)}
                  key={i}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

const RenderPausesSprint = ({
  sprint,
  handleAddPause,
  handleSetPause,
  handleRemovePause,
}) => {
  const handlePauseSet = (periodo, index) => {
    handleSetPause({
      periodo: periodo,
      index: index,
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-2 my-3">
        <label htmlFor="" className="">
          Pausas
        </label>
        <BtnOutline
          line="secondary"
          txt="+pause"
          onClick={(e) => handleAddPause(e)}
        />
      </div>
      <div className="p-2 row row-cols-4 ">
        {sprint && sprint.pauses.length > 0
          ? sprint.pauses.map((elem, index) => {
              return (
                <Periodo
                  value={elem}
                  setValue={(e) => {
                    handlePauseSet(e, index);
                  }}
                  inline={false}
                  getDesc={true}
                  key={index}
                  jornada={sprint.jornada}
                  removePeriodo={(id) => {
                    handleRemovePause(id);
                  }}
                />
              );
            })
          : "Sprint sem pausas definidas"}
      </div>
      <hr />
    </div>
  );
};
