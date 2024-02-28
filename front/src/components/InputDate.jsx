import React from "react";
import InputMask from "react-input-mask";

export default function InputDate({
  Label = "teste",
  name,
  width = 3,
  value,
  setValue,
  addClass,
  addClassInput,
  classInput = "",
  type = "datetime-local",
  max = 18,
  min = 0,
}) {
  const handleChandeDate = (data) => {
    const date = new Date(data);
    var horas = date.getHours();

    if (horas > max) {
      data = formatDate(date, max);
    }

    if (horas < min) {
      data = formatDate(date, min);
    }

    setValue(data);
  };

  const formatDate = (data, value) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    const hora = String(value).padStart(2, "0");

    if (type == "datetime-local") {
      return `${ano}-${mes}-${dia}T${hora}:00:00`;
    }

    return `${ano}-${mes}-${dia}`;
  };

  return (
    <div className={`mb-3 col-${width} ${addClass}`}>
      <label htmlFor={`input-${name}`} className="form-label">
        {Label}
      </label>
      <br />
      <input
        value={value}
        type={type}
        className={`w-100 form-control ${addClassInput} ${classInput}`}
        onChange={(e) => handleChandeDate(e.target.value)}
      />
    </div>
  );
}
