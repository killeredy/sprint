import { Horas, HorasType } from "./Hora";

export class Dia {
  isFinalSemana;
  horas = [];
  horasAlmoco = 2;
  diaMes;
  diaSemana;

  setDia = (date) => {
    this.diaMes = this.getDiaMes(date);
    this.diaSemana = this.getDiaSemana(date.getDay());
    this.isFinalSemana = this.diaSemana == "sab" || this.diaSemana == "dom";
  };

  getDiaMes = (date) => {
    return date.getDate() + "/" + (date.getMonth() + 1);
  };

  getDiaSemana = (diaDaSemana) => {
    const diasSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
    return diasSemana[diaDaSemana];
  };

  debug = () => {
    console.log(this);
  };

  render = (index) => {
    return DiaRender.render(index, this);
  };
}

export class DiaRender {
  static render = (index, dia) => {
    const show = dia.isFinalSemana ? "none" : "flex";
    return (
      <div className="" key={index}>
        <p className="w-100 text-center m-0 p-0">{dia.diaMes}</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            display: show,
            backgroundColor: "white",
            border: "solid gray 0.5px",
          }}
        >
          {dia.horas.map((elem) => {
            // pauses =  dia.pauses.filter((pause) =>{
            //   return elem.time ==
            // })
            return elem.render();
          })}
        </div>
      </div>
    );
  };
}
