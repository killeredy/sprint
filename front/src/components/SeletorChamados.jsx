import React, { useState, useEffect } from "react";

export default function SeletorChamados({ select, setSelect }) {
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(select);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showSel, setShowSel] = useState(false);

  useEffect(() => {
    // Função para buscar o array no localStorage
    const fetchOptions = () => {
      const storedOptions = localStorage.getItem("studeSprintChamados");
      if (storedOptions) {
        setOptions(JSON.parse(storedOptions));
        setFilteredOptions(JSON.parse(storedOptions));
      }
    };

    fetchOptions();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const filtered = options.filter((option) => {
      return option.numero.indexOf(value) != -1;
    });
    setSearchTerm(value);
    setFilteredOptions(filtered);
  };

  const handleShowSel = (e) => {
    setSelect(e);
  };

  return (
    <div className="container" onClick={() => setShowSel(!showSel)}>
      <div className="bg-light position-relative">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar opções..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ul
          className={`form-select ${
            !showSel ? "d-none" : ""
          } position-absolute`}
          value={select}
          onChange={(e) => handleShowSel(e.target.value)}
          style={{ top: "100%" }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              value={option.numero}
              onClick={() => {
                handleShowSel(option.numero);
              }}
            >
              {option.numero}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
