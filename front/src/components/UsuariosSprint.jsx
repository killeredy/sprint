import { useState } from "react";
import PeriodoPause from "./PeriodoPause";
import { periodoDefault, usuarioDefault } from "../objects/Defaunds";
import BtnOutline from "./BtnOutline";

export default function UsuariosSprint({
  usuarioDb,
  addUser,
  removeUser,
  userSprint,
  setUserSprint,
}) {
  const [sel, setSel] = useState(userSprint);

  const handleSelUser = (elem, user) => {
    const add = elem.checked;
    setSel(add);
    if (add) {
      addUser(user);
    } else {
      let text =
        "Deseja remover o usuario da sprint? Suas pausas serão apagadas";
      if (confirm(text) == true) {
        removeUser(user);
      }
    }
  };

  const handleAddPause = () => {
    const newUser = { ...userSprint };
    const newPeriod = new periodoDefault();
    newPeriod.id = newUser.pauses.length + 1;
    newUser.pauses.push(newPeriod);
    setSel(newUser);
    setUserSprint(newUser);
  };

  const handleSetDate = (date, index, range) => {
    const newUser = { ...userSprint };
    newUser.pauses[index][range] = date;
    setSel(newUser);
    setUserSprint(newUser);
  };

  const handleRemovePause = (id) => {
    const newUser = userSprint.pauses.filter((elem) => {
      return elem.id != id;
    });
    setUserSprint(newUser);
  };

  return (
    <div className="border-bottom py-2">
      <div className="form-check">
        <div className="d-flex align-items-center gap-2">
          <div>
            <input
              checked={sel}
              type="checkbox"
              className="form-check-input"
              id={`user-${usuarioDb.id}`}
              onChange={(e) => handleSelUser(e.target, usuarioDb)}
            />
            <label
              className="form-check-label"
              htmlFor={`user-${usuarioDb.id}`}
            >
              {usuarioDb.nome}
            </label>
          </div>
          {sel && (
            <BtnOutline
              line="secondary"
              txt="+pause"
              onClick={() => handleAddPause()}
            />
          )}
        </div>
      </div>
      {sel &&
        userSprint &&
        userSprint.pauses.map((data, index) => {
          return (
            <>
              <div key={index}>
                <PeriodoPause
                  valueInicio={data.dataInicial}
                  valueFinal={data.dataFinal}
                  setValueInicio={(e) => handleSetDate(e, index, "dataInicial")}
                  setValueFinal={(e) => handleSetDate(e, index, "dataFinal")}
                  removePeriodo={(id) => {
                    handleRemovePause(id);
                  }}
                />
              </div>
            </>
          );
        })}
    </div>
  );
}
