import { useEffect, useState } from "react";
import InputDateSel from "./InputDateSel";

export default function PeriodoPause({
  valueInicio,
  valueFinal,
  setValueInicio,
  setValueFinal,
  id,
  removePeriodo,
}) {
  const [dtinicio, setDtIncio] = useState(valueInicio);
  const [dtFinal, setDtFinal] = useState(valueFinal);

  const combineDateTimeInicio = (value, index) => {
    let dtStr = dtinicio.split(" ");
    dtStr[index] = value;
    const startDateTime = `${dtStr[0]} ${dtStr[1]}`;
    setDtIncio(startDateTime);
    setValueInicio(startDateTime);
  };

  const combineDateTimeFinal = (value, index) => {
    let dtStr = dtFinal.split(" ");
    dtStr[index] = value;
    const startDateTime = `${dtStr[0]} ${dtStr[1]}`;
    setDtFinal(startDateTime);
    setValueFinal(startDateTime);
  };

  const handleSetDateInicio = (dataInicio) => {
    combineDateTimeInicio(dataInicio, 0);
  };

  const handleSetHoraInicio = (horaInicio) => {
    combineDateTimeInicio(horaInicio, 1);
  };

  const handleSetDateFinal = (dataFinal) => {
    combineDateTimeFinal(dataFinal, 0);
  };

  const handleSetHoraFinal = (horaFinal) => {
    combineDateTimeFinal(horaFinal, 1);
  };

  const handleGetValues = (value, index) => {
    const valorInicialStr = value.split(" ");
    return valorInicialStr[index];
  };

  return (
    <div
      className={`border p-2 position-relative`}
      style={{ maxWidth: "max-content" }}
    >
      <button
        className="btn btn-danger position-absolute p-0"
        style={{ right: "2%", top: "2%" }}
        onClick={() => {
          removePeriodo(id);
        }}
      >
        <i className="bi bi-trash"></i>
      </button>

      <div className="p-1">
        <InputDateSel
          Label={"Data Inicial"}
          width={12}
          showHoras={true}
          data={handleGetValues(valueInicio, 0)}
          hora={handleGetValues(valueInicio, 1)}
          setData={(e) => handleSetDateInicio(e)}
          setHora={(e) => handleSetHoraInicio(e)}
        />
      </div>
      <div className="p-1">
        <InputDateSel
          Label={"Data Final"}
          width={12}
          showHoras={true}
          data={handleGetValues(valueFinal, 0)}
          hora={handleGetValues(valueFinal, 1)}
          setData={(e) => handleSetDateFinal(e)}
          setHora={(e) => handleSetHoraFinal(e)}
        />
      </div>
    </div>
  );
}
