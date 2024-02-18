import { useEffect, useState } from "react";
import { tarefasDefault } from "../../objects/Defaunds";
import InputText from "../InputText";
import "./ChamadoEdit.css";
import TarefaEdit from "../tarefas/TarefaEdit";

export default function ChamadosEdit({ chamadoEdit, setChamadoEdit }) {
  const [chamado, setChamado] = useState(chamadoEdit);
  const [duracao, setDuracao] = useState(0);

  useEffect(() => {
    let count = 0;
    for (var i in chamadoEdit.tarefas) {
      count += chamadoEdit.tarefas[i].tempo;
    }
    setDuracao(count);
  }, []);

  const handleCancelEdit = () => {
    let text = "Deseja cancelar a edição?";
    if (confirm(text) == true) {
      setChamadoEdit(undefined);
    }
  };

  const handleNumeroEdit = (e) => {
    const newChamado = { ...chamado };
    newChamado.numero = e;
    setChamado(newChamado);
  };

  const handleAddTarefas = () => {
    const newChamado = { ...chamado };
    const newTarefa = new tarefasDefault();
    newTarefa.id = newChamado.tarefas.length;
    newChamado.tarefas.push(newTarefa);
    setChamado(newChamado);
  };

  const handleSetTarefa = (newTarefa) => {
    const newChamado = { ...chamado };
    const index = newChamado.tarefas.findIndex(
      (elem) => elem.id == newTarefa.id
    );
    newChamado.tarefas[index] = newTarefa;
    let count = 0;
    for (var i in newChamado.tarefas) {
      count += newChamado.tarefas[i].tempo;
    }
    setChamado(newChamado);
    setDuracao(count);
  };

  const handleSave = () => {
    setChamadoEdit(chamado);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Edit Chamado</h2>
        <button onClick={() => handleSave()} className="btn btn-primary">
          Salvar
        </button>
        <button onClick={() => handleCancelEdit()} className="btn btn-danger">
          Cancelar
        </button>
      </div>
      <hr />
      <div>
        <div className="d-flex align-items-end">
          <InputText
            label="Numero"
            type="number"
            value={chamado.numero}
            width={6}
            setValue={(e) => handleNumeroEdit(e)}
          />
          <div className="mb-2 form-group">
            <label htmlFor="">Duração</label>
            <h6 className="form-control mt-1">{duracao}</h6>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h6>Tarefas</h6>
            <button
              onClick={() => handleAddTarefas()}
              className="btn btn-primary"
            >
              +
            </button>
          </div>
        </div>
        <div>
          {chamado &&
            chamado.tarefas.map((tarefa, index) => {
              return (
                <TarefaEdit
                  tarefa={tarefa}
                  setTarefa={(tarefa) => handleSetTarefa(tarefa, index)}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
