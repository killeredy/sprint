export class HorasType {
  static typesColor = {
    none: "ligth",
    trabalho: "success",
    feriado: "warning",
    outros: "black",
  };
  static select = [
    { value: "feriado", label: "Feriado" },
    { value: "outros", label: "black" },
  ];
}

export class Horas {
  dia;
  hora = 0;
  color = "light";
  status = 0;
  time = 0;
  diaMes;
  diaSemana;
  isFinalSemana;
  border;
  value;
  status = 0;
  styles = ["light", "warning", "primary", "secondary"];

  setType = ($type) => {
    this.color = HorasType.typesColor[$type];
  };

  setDia = (date) => {
    this.diaMes = this.getDiaMes(date);
    this.diaSemana = this.getDiaSemana(date.getDay());
    this.isFinalSemana = this.diaSemana == "sab" || this.diaSemana == "dom";
    this.status = this.isFinalSemana ? 5 : this.status;
    this.border = this.setBorder();
  };

  getDiaSemana = (diaDaSemana) => {
    const diasSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
    return diasSemana[diaDaSemana];
  };

  getDiaMes = (date) => {
    return date.getDate() + "/" + (date.getMonth() + 1);
  };

  getTime = ($hour) => {
    return $hour.getTime();
  };
  setBorder = () => {
    const border = {
      b8: "1px 0px 1px 1px",
      b17: "1px 1px 1px 0px",
      out: "1px 0px 1px 0px",
    };

    const key = "b" + this.hora;
    const index = key != "b8" && key != "b17" ? "out" : key;

    return border[index];
  };

  render = () => {
    return HorasRender.render(this);
  };
}

export class HorasRender {
  static render = (horas, index) => {
    const style = {
      width: "100%",
      height: "50px",
      visibility: horas.isFinalSemana ? "hidden" : "visible",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: horas.border,
      filter: `brightness(${index % 2 == 0 ? 0.97 : 1})`,
    };

    return (
      <div
        key={index}
        id={`h-` + horas.value}
        data-day={horas.diaSemana}
        className={`bg-${horas.styles[horas.status]} horas`}
        style={style}
      ></div>
    );
  };
}
