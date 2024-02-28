import PeriodoPause from "../components/PeriodoPause";
import {
  pauseDefault,
  periodoDefault,
  sprintDefault,
  usuarioDefault,
} from "../objects/Defaunds";
import UsuariosSprint from "../components/UsuariosSprint";
import { useContext, useEffect, useState } from "react";
import GetSprint from "../api/GetSprints";
import PostSprint from "../api/PostSprint";
import { useNavigate, useParams } from "react-router-dom";
import BtnOutline from "../components/BtnOutline";
import InputText from "../components/InputText";
import ValidadeDate from "../components/ValidadeDate";
import { GetUsersLocalList } from "../api/GetUsersLocalList";
import { SprintContext } from "../providers/sprintDb";
import PeriodoSprint from "../components/PeriodoSprint";

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

  // const handleSetUserSprint = ({useId, newUse}) => {
  const handleSetUserSprint = (userDb) => {
    const newSprint = { ...sprint };
    const newUseList = newSprint.usuarios.filter(
      (elem) => elem.id == userDb.id
    )[0];
    const index = newSprint.usuarios.indexOf(newUseList);
    newSprint.usuarios[index] = userDb.user;
    console.log(newSprint);
    setSprint(newSprint);
  };

  // if (sprint) {
  //   console.log(sprint);
  // }

  return (
    <SprintContext.Provider value={[sprint, setSprint]}>
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
                  <PeriodoSprint
                    value={sprint.periodo}
                    setValue={(e) => handleSetPeriodo(e)}
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

            {!sprint || (!sprint.periodo.inicio && !sprint.periodo.final) ? (
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
    </SprintContext.Provider>
  );
}

const RenderConfigUser = ({
  handleAddUser,
  handleSetUserSprint,
  handleRemoveUser,
}) => {
  const usuarios = GetUsersLocalList();
  const [sprint, setSprint] = useContext(SprintContext);

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
                    sprint.usuarios.filter((user) => {
                      return user.id == elem.id;
                    })[0]
                  }
                  setUserSprint={(newUse) =>
                    handleSetUserSprint({ id: elem.id, user: newUse })
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

// ------------------- PAUSAS ----------------------//

const RenderPausesSprint = () => {
  const [sprint, setSprint] = useContext(SprintContext);
  const handleSetDate = (date, index, range) => {
    const newUser = { ...sprint };
    newUser.pauses[index][range] = date;
    setSprint(newUser);
  };

  const handleAddPause = () => {
    const newPause = new pauseDefault();
    newPause.id = sprint.pauses.length;

    const newSprint = { ...sprint };

    newSprint.pauses.push(newPause);
    setSprint(newSprint);
  };

  const handleRemovePause = (id) => {
    console.log(id);
    const newSprint = { ...sprint };
    newSprint.pauses = sprint.pauses.filter((elem) => {
      return elem.id != id;
    });

    setSprint(newSprint);
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
      <div className="p-2 row">
        {sprint && sprint.pauses.length > 0
          ? sprint.pauses.map((data, index) => {
              console.log(data);
              return (
                <PeriodoPause
                  valueInicio={data.dataInicial}
                  valueFinal={data.dataFinal}
                  setValueInicio={(e) => handleSetDate(e, index, "dataInicial")}
                  setValueFinal={(e) => handleSetDate(e, index, "dataFinal")}
                  removePeriodo={(id) => handleRemovePause(id)}
                  id={data.id}
                />
              );
            })
          : "Sprint sem pausas definidas"}
      </div>
      <hr />
    </div>
  );
};
