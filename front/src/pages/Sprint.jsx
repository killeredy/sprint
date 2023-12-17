import React from "react";
import { useSprint } from "../providers/sprintDb";
import InputText from "../components/InputText";
import InputDate from "../components/InputDate";
import { useUsuarios } from "../providers/UsuarioDb";
import { pauseDefault, sprintDefault } from "../objects/Defaunds";

export default function Sprint() {
  const { sprint, setSprint } = useSprint();
  const { usuarios } = useUsuarios();

  const handleSaveSprint = () => {
    const newSprints = JSON.stringify(sprint);
    localStorage.setItem("sprint", newSprints);

    const url = import.meta.env.VITE_URL_API + "sprint";

    fetch(url, {
      method: "POST",
      body: newSprints,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => console.log("Erro de solicitação", err));
  };

  const handleAddSprint = () => {
    const newSprints = [...sprint];
    const insert = new sprintDefault();
    insert.pausas.push(pauseDefault);
    insert.id = sprint.length + 1;

    newSprints.push(insert);
    setSprint(newSprints);
  };

  const handleDate = (value, date, index) => {
    const newSprint = [...sprint];
    newSprint[index][date] = value;
    setSprint(newSprint);
  };

  const handleHorasDia = (value, index) => {
    const newSprint = [...sprint];
    newSprint[index].tempo_diario = value;
    setSprint(newSprint);
  };

  const handleDatePause = (value, indexChamado, indexPausa, time) => {
    const newSprint = [...sprint];
    newSprint[indexChamado].pausas[indexPausa][time] = value;
    setSprint(newSprint);
  };

  const handleDatePauseDesc = (value, indexChamado, indexPausa) => {
    const newSprint = [...sprint];
    newSprint[indexChamado].pausas[indexPausa].desc = value;
    setSprint(newSprint);
  };

  const handleDatePauseRemove = (indexChamado, indexPausa) => {
    const newSprint = [...sprint];
    const pauses = newSprint[indexChamado].pausas;
    const value = pauses.filter((pause) => pause.id !== indexPausa);
    newSprint[indexChamado].pausas = value;
    setSprint(newSprint);
  };

  const handleDatePauseAdd = (indexChamado) => {
    const newSprint = [...sprint];
    const pauses = newSprint[indexChamado].pausas;
    pauses.push({
      id: pauses.length + 1,
      data_inicial: "",
      data_final: "",
      desc: "",
    });

    newSprint[indexChamado].pausas = pauses;
    setSprint(newSprint);
  };

  const handleSelUser = (indexChamado, user, targer) => {
    const newSprint = [...sprint];
    if (targer.checked) {
      console.log("ligado");
      newSprint[indexChamado].pessoa.push(user);
    } else {
      console.log("desligado");
      console.log([user]);
      const pessoas = newSprint[indexChamado].pessoa;
      const newPessoa = pessoas.filter((pes) => pes.id !== user.id);
      newSprint[indexChamado].pessoa = newPessoa;
    }
    setSprint(newSprint);
    console.log(sprint);
  };

  return (
    <>
      <h1>Sprint Config</h1>
      <div className="d-flex gap-5">
        <button className="btn btn primary" onClick={() => handleAddSprint()}>
          Add
        </button>
        <button className="btn btn success" onClick={() => handleSaveSprint()}>
          Salve
        </button>
      </div>
      <div className="accordion accordion-flush" id="accordionSprint">
        <div>
          {sprint.map((elem, index) => {
            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accord-body-${elem.id}`}
                    aria-expanded="false"
                    aria-controls={`accord-body-${elem.id}`}
                  >
                    {`Sprint nº ${elem.id}, De ${elem.data_inicial} à ${elem.data_final}`}
                  </button>
                </h2>
                <div
                  id={`accord-body-${elem.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body border">
                    <div className="d-flex gap-5 row-cols-3">
                      <InputDate
                        Label={"Data Inicial"}
                        value={elem.data_inicial}
                        setValue={(e) => handleDate(e, "data_inicial", index)}
                      />
                      <InputDate
                        Label={"Data Final"}
                        value={elem.data_final}
                        setValue={(e) => handleDate(e, "data_final", index)}
                      />
                      <InputText
                        Label={"Horas por dia"}
                        value={elem.tempo_diario}
                        setValue={(e) => handleHorasDia(e, index)}
                      />
                    </div>
                    <div className="border p-3">
                      <h6>Usuários</h6>
                      <div className="d-flex gap-3">
                        {usuarios &&
                          usuarios.map((el, i) => {
                            return (
                              <div key={i}>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`user-${el.id}`}
                                    onChange={(e) =>
                                      handleSelUser(index, el, e.target)
                                    }
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`user-${el.id}`}
                                  >
                                    {el.nome}
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="border p-3">
                      <div className="d-flex align-items-center gap-1 mb-3">
                        <h6 className="m-0">Pausas</h6>
                        <button
                          className="btn btn-success m-1 p-0 px-1 m-0"
                          onClick={(e) => handleDatePauseAdd(index)}
                          style={{ right: 0 }}
                        >
                          +
                        </button>
                      </div>
                      <div className="d-flex flex-wrap">
                        {elem.pausas.map((pausa, iPausa) => {
                          return (
                            <div className="p-1 col-6" key={iPausa}>
                              <div className="border d-flex position-relative">
                                <div className="p-1">
                                  <InputDate
                                    Label={"Data Inicial"}
                                    showHoras={true}
                                    width={12}
                                    value={pausa.data_inicial}
                                    setValue={(e) =>
                                      handleDatePause(
                                        e,
                                        index,
                                        iPausa,
                                        "data_inicial"
                                      )
                                    }
                                  />
                                </div>

                                <div className="p-1">
                                  <InputDate
                                    Label={"Data Final"}
                                    showHoras={true}
                                    width={12}
                                    value={pausa.data_final}
                                    setValue={(e) =>
                                      handleDatePause(
                                        e,
                                        index,
                                        iPausa,
                                        "data_final"
                                      )
                                    }
                                  />
                                </div>
                                <div className="p-1">
                                  <InputText
                                    Label={"Descrição"}
                                    showHoras={true}
                                    width={12}
                                    value={pausa.desc}
                                    setValue={(e) =>
                                      handleDatePauseDesc(e, index, iPausa)
                                    }
                                  />
                                </div>
                                <button
                                  className="btn btn-danger position-absolute top-0 m-1 p-0 px-1"
                                  onClick={(e) =>
                                    handleDatePauseRemove(index, pausa.id)
                                  }
                                  style={{ right: 0 }}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
