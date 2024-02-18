export default function ValidadeDate(sprint, periodo) {
  const inicialSprintStr = sprint.periodo.dataInicial;
  const finalSprintStr = sprint.periodo.dataFinal;

  if (inicialSprintStr == "" || finalSprintStr == "") {
    alert("Definir Período Sprint");
    return false;
  }

  if (periodo.dataInicial == "" || periodo.dataFinal == "") {
    return;
  }
  const inicialPeriodo = periodo.dataInicial;
  const finalPeriodo = periodo.dataFinal;

  const dtInicialSprint = new Date(inicialSprintStr);
  const dtFinalSprint = new Date(finalSprintStr);

  const dtInicialPeriodo = new Date(inicialPeriodo);
  const dtFinalPeriodo = new Date(finalPeriodo);

  if (
    dtInicialSprint <= dtInicialPeriodo &&
    dtInicialPeriodo <= dtFinalSprint &&
    dtInicialSprint <= dtFinalPeriodo &&
    dtFinalPeriodo <= dtFinalSprint
  ) {
    alert("Erro ao definir periodo");
    return false;
  }

  return true;
}
