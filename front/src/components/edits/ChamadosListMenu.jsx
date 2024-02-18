export default function ChamadosListMenu({ addChamado }) {
  return (
    <div className="d-flex gap-2 w-100 justify-content-between">
      <h3 className="text-dark">Lista de chamados</h3>
      <button
        onClick={() => addChamado()}
        className="btn btn-dark rounded-circle h-1"
      >
        +
      </button>
    </div>
  );
}
