export default function ChamadosList({ chamados, setChamados, removeChamado }) {
  const handleEditChamado = (id) => {
    const newChamado = chamados.filter((elem) => elem.id == id)[0];
    setChamados(newChamado);
  };
  const handleRemoveChamado = (id) => {
    let text = "Deseja apagar esse chamado?";
    if (confirm(text) == true) {
      removeChamado(id);
    }
  };
  return (
    <>
      <div className="mt-3">
        {chamados && chamados.length > 0 ? (
          <table className="table table-striped">
            <thead></thead>
            <tbody>
              {chamados.map((chamado, index) => {
                return (
                  <tr key={index}>
                    <td className="d-flex flex-wrap">
                      <div className="col-6">
                        <label htmlFor="">
                          Nº:{" "}
                          <span className="badge badge-secondary text-dark m-0">
                            {chamado.numero}
                          </span>
                        </label>
                      </div>
                      <div className="col-6">
                        <p className="m-0 p-0">
                          <span className="me-1">Duração:</span>
                          {chamado.tarefas
                            .map((elem) => elem.tempo)
                            .reduce((q, v) => q + v)}
                          Horas
                        </p>
                      </div>
                      <div className="col-12">
                        <span className="me-1">resp(s):</span>
                        <span>
                          {chamado.tarefas.map(
                            (elem) => elem.nome_pessoa + ", "
                          )}
                        </span>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-success p-1"
                        onClick={(e) => handleEditChamado(chamado.id)}
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger p-1"
                        onClick={(e) => handleRemoveChamado(chamado.id)}
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h6 className="text-dark">Sem chamado cadastrado</h6>
          </div>
        )}
      </div>
    </>
  );
}
