import React from "react";

export default function InputText({
  label,
  name,
  type = "text",
  width = 3,
  value,
  setValue,
  max = 1000,
  min = 0,
}) {
  return (
    <div className={`mb-3 col-${width}`}>
      <label htmlFor={`input-${name}`} className="form-label">
        {label}
      </label>
      <br />
      <input
        type={type}
        className="w-100 form-control"
        id={`input-${name}`}
        value={value}
        max={max}
        min={min}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
