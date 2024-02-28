import { useContext } from "react";
import { Horas } from "../objects/Hora";
import { SprintContext } from "../providers/sprintDb";

export class TimeLine {
  dias = [];
  pauses = [];
  jornada;
  periodo;

  setPausas = ($pauses) => {
    this.pauses = this.getPauses($pauses);
  };

  getPauses($pauses) {
    let pauses = [];
    for (let i = 0; i < $pauses.length; i++) {
      var p = this.getDiasParcial($pauses[i]);
      pauses = pauses.concat(p);
    }

    return pauses;
  }

  setDiasSprint = () => {
    this.dias = this.getDiasFull();
  };

  getDiasFull = (periodo) => {
    let dias = [];
    var inicial = this.getDateObjPeriodo("inicio");
    var final = this.getDateObjPeriodo("final");

    while (inicial <= final) {
      var value = this.getHoras(inicial);
      var diaMes = this.getDiaMes(inicial);
      var time = inicial.getTime();

      var status = this.getStatusId(time);

      var hora = new Horas();
      hora.hora = inicial.getHours();
      hora.value = value;
      hora.diaMes = diaMes;
      hora.time = time;
      hora.status = status;
      hora.setDia(inicial);
      dias.push(hora);

      var add = 1;

      if (inicial.getHours() == 17) {
        add = 6 + 9;
      } else if (inicial.getHours() == 11) {
        add = 3;
      }

      inicial.setHours(inicial.getHours() + add);
    }

    return dias;
  };

  getDiasParcial = (periodo) => {
    let horas = [];
    var inicial = this.getDateObjPause(periodo, ["dataInicial"]);
    var final = this.getDateObjPause(periodo, ["dataFinal"]);

    while (inicial <= final) {
      var value = this.getHoras(inicial);
      var date = this.getDiaMes(inicial);
      var time = inicial.getTime();

      var hora = new Horas();
      hora.value = value;
      hora.dia = date;
      hora.time = time;
      hora.status = 3;
      horas.push(hora);
      var add = 1;

      if (inicial.getHours() == 18) {
        add = 6 + 8;
      }
      inicial.setHours(inicial.getHours() + add);
    }
    return horas;
  };

  getDiaMes = (data) => {
    return data.getDate() + "/" + (data.getMonth() + 1);
  };

  getHoras($horas) {
    let currentHour = $horas.getHours();
    let currentMinute = $horas.getMinutes();

    currentHour =
      currentHour.toString().length == 1 ? "0" + currentHour : currentHour;
    currentMinute =
      currentMinute.toString().length == 1
        ? "0" + currentMinute
        : currentMinute;

    return `${currentHour}:${currentMinute} - ${
      parseInt(currentHour) + 1
    }:${currentMinute} `;
  }

  getStatusId = (time) => {
    const hora = this.pauses.filter((elem) => {
      return elem.time == time;
    });

    if (hora.length > 0) {
      return 1;
    }

    return 0;
  };

  getDateObjPeriodo = (range) => {
    const dateStr = this.periodo[range];
    let horas = range == "inicio" ? this.jornada.inicio : this.jornada.final;
    horas = this.padStart(horas, 2);
    const date = dateStr + " " + horas + ":00";
    const newDate = new Date(date);
    return newDate;
  };

  getDateObjPause = (periodo, range) => {
    const dateStr = periodo[range];
    const date = dateStr.replace("T", " ");
    const newDate = new Date(date);
    return newDate;
  };

  filterPauseUser = (user, dias, tarefaHoras) => {
    const pauses = this.getPauses(user.pauses);
    for (let i = 0; i < pauses.length; i++) {
      for (let j = 0; j < dias.length; j++) {
        if (pauses[i].time == dias[j].time) {
          dias[j].status = 2;
          break;
        }
      }
    }
    return dias;
  };

  filterUserHorasTrab = (dias, tarefaHoras) => {
    if (tarefaHoras == undefined) {
      return dias;
    }
    for (let j = 0; j < dias.length; j++) {
      if (tarefaHoras <= 0) {
        break;
      }
      if (dias[j].status == 0) {
        dias[j].status = 3;
        tarefaHoras--;
      }
    }

    return dias;
  };

  getDays() {
    return this.dias;
  }

  padStart = (num, totalLength) => {
    return String(num).padStart(totalLength, "0");
  };
}
