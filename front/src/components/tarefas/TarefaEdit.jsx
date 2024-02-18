import { useContext, useState } from "react";
import InputText from "../InputText";
import { SprintContext } from "../../providers/sprintDb";

export default function TarefaEdit({ tarefa, setTarefa }) {
  const [typeTime, setTypeTime] = useState("horas");
  const [time, setTime] = useState(tarefa.tempo);
  const { sprint } = useContext(SprintContext);

  const tempoAlmoco = sprint.jornada.finalAlmoco - sprint.jornada.inicioAlmoco;
  const tempoJornada = sprint.jornada.final - sprint.jornada.inicio;
  const timeDay = tempoJornada - tempoAlmoco;

  const handleSetTypeTime = (type) => {
    let newTime = 0;
    if (type == "dias") {
      newTime = time * timeDay;
    } else if (type == "semanas") {
      newTime = time * (timeDay * 5);
    }
    handleSetTime(newTime);
    setTypeTime("horas");
  };

  const handleSetTime = (newTime) => {
    newTime = parseInt(newTime);
    // tarefa.tempo = newTime;
    setTime(newTime);

    const newTarefa = { ...tarefa };
    newTarefa.tempo = newTime;
    setTarefa(newTarefa);
  };

  const handleSelUser = (userId) => {
    const user = sprint.usuarios.filter((e) => e.id == userId)[0];
    const newTarefa = { ...tarefa };
    newTarefa.id_pessoa = user.id;
    newTarefa.nome_pessoa = user.nome;
    setTarefa(newTarefa);
  };

  const timesTypes = [
    { value: "horas", label: "Horas" },
    { value: "dias", label: "Dias" },
    { value: "semanas", label: "Semanas" },
  ];

  return (
    <div className="d-flex  w-100 flex-wrap">
      <div className="form-group col-4 p-1">
        <label htmlFor="">Usuário</label>
        <select
          className="form-control mt-1"
          id=""
          value={tarefa.id_pessoa}
          onChange={(e) => handleSelUser(e.target.value)}
        >
          <option>Selecione</option>
          {sprint &&
            sprint.usuarios.map((u, i) => {
              return (
                <option value={u.id} key={i}>
                  {u.nome}
                </option>
              );
            })}
        </select>
      </div>
      <div className="col-3">
        <InputText
          label="Tempo"
          type="number"
          width={12}
          setValue={(time) => handleSetTime(time)}
          value={time}
        />
        <small className="m-0">(horas)</small>
      </div>
      <div className="form-group col-4 p-1">
        <label htmlFor="">período</label>
        <select
          name=""
          id=""
          className="form-control mt-1"
          onChange={(e) => handleSetTypeTime(e.target.value)}
          value={typeTime}
        >
          {timesTypes.map((e, i) => {
            return (
              <option value={e.value} key={i}>
                {e.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="d-flex justify-content-center col-1 py-4">
        <button
          onClick={() => {
            handleCalcTime();
          }}
          className="btn btn-danger p-0"
        >
          <i class="bi bi-trash m-0"></i>
        </button>
      </div>
    </div>
  );
}
