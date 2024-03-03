import { TimeLine } from "../objects/TimeLine";
import { HorasRender } from "../objects/Hora";
import { SprintContext } from "../providers/sprintDb";
import { useContext, useEffect, useState } from "react";

export default function Calendario() {
  const { sprint } = useContext(SprintContext);
  const [count, setCount] = useState(0);
  // const [totalHoras, setTotalHoras] = useState(0);

  const diasSprint = new TimeLine();
  diasSprint.periodo = sprint.periodo;
  diasSprint.jornada = sprint.jornada;
  diasSprint.setPausas(sprint.pauses);
  diasSprint.setDiasSprint();
  const timeline = diasSprint.getDays();
  const totalHoras = getTotaHorasSprint(timeline);
  // setTotalHoras(h);

  return (
    <>
      <h3>Calendário</h3>
      <hr />
      <div className="w-100 overflow-auto" style={{ maxHeight: "90%" }}>
        {sprint.usuarios &&
          timeline &&
          sprint.usuarios.map((user, index) => {
            const dias = JSON.parse(JSON.stringify(timeline));
            const larg = 100 / dias.length;
            const tarefaHoras = getTimeUser(user, sprint.chamados);
            var time = new TimeLine();
            let userTimeLine = time.filterPauseUser(user, dias);
            userTimeLine = time.filterUserHorasTrab(userTimeLine, tarefaHoras);
            const hTrab = getTotaHorasSprint(userTimeLine);
            let count = 0;

            return (
              <div key={index}>
                <div className="w-100 my-4">
                  <h5
                    className="bg-primary p-2 rounded"
                    style={{ maxWidth: "max-content" }}
                  >
                    {user.nome}
                  </h5>
                  <div>
                    <div className="d-flex position-relative rounded">
                      {userTimeLine.map((elem, index) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="position-relative mb-4"
                              style={{
                                width: elem.isFinalSemana ? "1px" : `${larg}%`,
                              }}
                            >
                              {/* SHOW DIA SEMANA E DATA */}
                              {elem.value == "08:00 - 9:00 " &&
                                !elem.isFinalSemana && (
                                  <small
                                    className="position-absolute text-center"
                                    style={{ width: "50px" }}
                                  >
                                    {`${elem.diaSemana} ${elem.diaMes}`}
                                  </small>
                                )}
                              {/* SHOW TIMELINE */}
                              <div className="mt-4">
                                {HorasRender.render(elem, index, larg)}
                              </div>
                              {/* SHOW NUMERO DE DIA */}
                              <small
                                className="position-absolute text-center"
                                style={{ width: "45px" }}
                              >
                                {elem.value == "08:00 - 9:00 " &&
                                  !elem.isFinalSemana &&
                                  `${(count += 1)}`}
                              </small>
                            </div>
                            <hr />
                          </>
                        );
                      })}
                      <div className="h-100 py-1 ms-3">
                        <div>Restante</div>
                        <div className="h-100">
                          <span className="text-center">
                            {`${hTrab}`} Horas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

function getTotaHorasSprint(dias) {
  return dias.filter((x) => x.status == 0).length;
}

function getTimeUser(user, chamados) {
  let horas = 0;
  if (chamados.length == 0) {
    return 0;
  }

  for (let i = 0; i < chamados.length; i++) {
    let tarefas = chamados[i].tarefas;
    for (let j = 0; j < tarefas.length; j++) {
      if (tarefas[j].id_pessoa == user.id) {
        horas += tarefas[j].tempo;
      }
    }
  }
  return horas;
}
