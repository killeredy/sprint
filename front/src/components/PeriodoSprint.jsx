import InputDateSel from "./InputDateSel";

export default function PeriodoSprint({ value, setValue }) {
  const handleDatePause = (valueInput, time) => {
    const newValue = { ...value };
    newValue[time] = valueInput;
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className={`border p-2 position-relative d-flex`}>
      <div className="p-1">
        <InputDateSel
          Label={"Data Inicial"}
          width={12}
          showHoras={false}
          data={value.inicio}
          setData={(e) => handleDatePause(e, "inicio")}
        />
      </div>

      <div className="p-1">
        <InputDateSel
          Label={"Data Final"}
          width={12}
          showHoras={false}
          data={value.final}
          setData={(e) => handleDatePause(e, "final")}
        />
      </div>
    </div>
  );
}
