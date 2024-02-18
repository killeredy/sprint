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

  return (
    <>
      <h3>Calendário</h3>
      {sprint.usuarios &&
        timeline &&
        sprint.usuarios.map((user, index) => {
          const dias = JSON.parse(JSON.stringify(timeline));
          const tarefaHoras = getTimeUser(user, sprint.chamados);
          var time = new TimeLine();
          let userTimeLine = time.filterPauseUser(user, dias);
          userTimeLine = time.filterUserHorasTrab(userTimeLine, tarefaHoras);

          return (
            <div key={index}>
              <div className="w-100 my-2">
                <h5>{user.nome}</h5>
                <div>
                  <div className="d-flex position-relative rounded">
                    {userTimeLine.map((elem, index) => {
                      return HorasRender.render(elem, index);
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
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
