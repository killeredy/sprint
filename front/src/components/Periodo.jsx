import InputDate from "./InputDate";
import InputText from "./InputText";

export default function Periodo({
  value,
  setValue,
  getDesc = true,
  inline = true,
  type = "datetime-local",
  jornada,
  removePeriodo = undefined,
}) {
  const handleDatePause = (valueInput, time) => {
    const newValue = { ...value };
    newValue[time] = valueInput;
    setValue(newValue);
  };

  const handleDatePauseDesc = (valueInput) => {
    const newValue = { ...value };
    newValue.desc = valueInput;
    setValue(newValue);
  };

  return (
    <div className={`border p-2 position-relative ${inline ? "d-flex" : ""}`}>
      {removePeriodo && (
        <button
          className="btn btn-danger position-absolute p-0"
          style={{ right: "2%", top: "2%" }}
          onClick={() => {
            removePeriodo(value.id);
          }}
        >
          <i className="bi bi-trash"></i>
        </button>
      )}
      <div className="p-1">
        <InputDate
          Label={"Data Inicial"}
          showHoras={true}
          width={12}
          value={value.dataInicial ? value.dataInicial : ""}
          setValue={(e) => handleDatePause(e, "dataInicial")}
          classInput="dateInicial"
          type={type}
          min={jornada.inicio}
          max={jornada.final}
        />
      </div>

      <div className="p-1">
        <InputDate
          Label={"Data Final"}
          showHoras={true}
          width={12}
          value={value.dataFinal ? value.dataFinal : ""}
          setValue={(e) => handleDatePause(e, "dataFinal")}
          classInput="dateFinal"
          type={type}
        />
      </div>
      {getDesc && (
        <div className="p-1">
          <InputText
            label={"Descrição"}
            showHoras={true}
            width={12}
            value={value.desc}
            setValue={(e) => handleDatePauseDesc(e)}
          />
        </div>
      )}
    </div>
  );
}
