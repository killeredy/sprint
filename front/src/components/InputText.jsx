import React from "react";

export default function InputText({
  Label,
  name,
  type = "text",
  width = 3,
  value,
  setValue,
}) {
  return (
    <div className={`mb-3 col-${width}`}>
      <label htmlFor={`input-${name}`} className="form-label">
        {Label}
      </label>
      <br />
      <input
        type={type}
        className="w-100 form-control"
        id={`input-${name}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
