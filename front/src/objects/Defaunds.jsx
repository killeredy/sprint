export class sprintDefault {
  id = null;
  data_inicial = "";
  data_final = "";
  tempo_diario = 7;
  chamados = [];
  pessoa = [];
  pausas = [];
}

export class chamadosDefault {
  id = null;
  desc = "";
  tarefas = [];
}

export class tarefasDefault {
  id = null;
  id_pessoa = null;
  tempo = null;
}

export class pauseDefault {
  id = null;
  data_inicial = "";
  data_final = "";
  desc = "";
}
