import React, { useContext, useEffect, useState } from "react";
import { SprintContext } from "../providers/sprintDb";

export default function InputDateSel({
  Label = "teste",
  name,
  width = 3,
  data,
  setData,
  hora = "08:00",
  setHora,
  showHoras = true,
  addClass,
  addClassInput,
  classInput = "",
}) {
  const [horasList, setHorasList] = useState([]);
  const [sprint] = useContext(SprintContext);

  useEffect(() => {
    const jornada = sprint.jornada;
    const incio = jornada.inicio;
    const almocoInicial = jornada.inicioAlmoco;
    const almocoFinal = jornada.finalAlmoco;
    const final = jornada.final;

    let list = [];

    for (let i = incio; i <= final; i++) {
      if (almocoInicial <= i && i < almocoFinal) {
        continue;
      }
      let hora = String(i).padStart(2, "0");
      list.push(hora + ":00");
    }

    setHorasList(list);
  }, []);

  return (
    <div className={`mb-3 d-flex gap-1 col-${width} ${addClass}`}>
      <div>
        <label htmlFor={`input-${name}`} className="form-label">
          {Label}
        </label>
        <br />
        <input
          value={data}
          type="date"
          className={`w-100 form-control ${addClassInput} ${classInput}`}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      {showHoras && (
        <div>
          <label htmlFor="" className="mb-2">
            Horas h
          </label>
          <select
            name=""
            className="form-select"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          >
            {horasList &&
              horasList.map((elem, index) => {
                return (
                  <option key={index} value={elem}>
                    {elem}
                  </option>
                );
              })}
          </select>
        </div>
      )}
    </div>
  );
}
