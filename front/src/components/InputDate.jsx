import React from "react";
import InputMask from "react-input-mask";

export default function InputDate({
  Label = "teste",
  showHoras = false,
  name,
  width = 3,
  value,
  setValue,
  addClass,
  addClassInput,
}) {
  return (
    <div className={`mb-3 col-${width} ${addClass}`}>
      <label htmlFor={`input-${name}`} className="form-label">
        {Label}
      </label>
      <br />
      <InputMask
        type="tel"
        id={`input-${name}`}
        value={value}
        mask={`9999/99/99${showHoras ? " 00:00" : ""}`}
        className={`w-100 form-control ${addClassInput}`}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
