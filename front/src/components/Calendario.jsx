import { TimeLine } from "../objects/TimeLine";
import { HorasRender } from "../objects/Hora";
import { SprintContext } from "../providers/sprintDb";
import { useContext, useEffect, useState } from "react";

export default function Calendario() {
  const { sprint } = useContext(SprintContext);

  const diasSprint = new TimeLine();
  diasSprint.periodo = sprint.periodo;
  diasSprint.jornada = sprint.jornada;
  diasSprint.setPausas(sprint.pauses);
  diasSprint.setDiasSprint();
  const timeline = diasSprint.getDays();
  const totalHoras = getTotaHorasSprint(timeline);

  return (
    <>
      <div className="d-flex align-items-end">
        <h3 className="me-4">Calendário: </h3>
        <h4>
          De {sprint.periodo.inicio} à {sprint.periodo.final} / {totalHoras}{" "}
          horas
        </h4>
      </div>
      <hr />
      <div className="w-100 overflow-auto" style={{ maxHeight: "90%" }}>
        {sprint.usuarios &&
          timeline &&
          sprint.usuarios.map((user, index) => {
            const dias = JSON.parse(JSON.stringify(timeline));
            const larg = 100 / dias.length + 0.1;
            const tarefaHoras = getTimeUser(user, sprint.chamados);
            var time = new TimeLine();
            let userTimeLine = time.filterPauseUser(user, dias);
            userTimeLine = time.filterUserHorasTrab(userTimeLine, tarefaHoras);
            const hTrab = getTotaHorasSprint(userTimeLine);
            const per = ((totalHoras - hTrab) * 100) / totalHoras;
            let classHr = "success";
            if (per > 80) {
              classHr = "danger";
            } else if (per > 50) {
              classHr = "warning";
            }

            console.log([user.nome, per, hTrab]);
            return (
              <div key={index}>
                <div className="w-100 my-4">
                  <h5 className="" style={{ maxWidth: "max-content" }}>
                    {user.nome} -
                    <span
                      className={`text-center ms-3 px-2 rounded bg-${classHr}`}
                    >
                      {`${hTrab}`}hr Restante
                    </span>
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
                                  <div
                                    className="position-absolute text-center"
                                    style={{ width: "50px" }}
                                  >
                                    <p className="m-0 p-0">{elem.diaSemana}</p>
                                    <p className="m-0 p-0">{elem.diaMes}</p>
                                  </div>
                                )}
                              {/* SHOW TIMELINE */}
                              <div className="mt-5">
                                {HorasRender.render(elem, index, larg)}
                              </div>
                              {/* SHOW NUMERO DE DIA */}
                            </div>
                            <hr />
                          </>
                        );
                      })}
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
