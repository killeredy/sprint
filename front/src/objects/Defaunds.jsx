export class sprintDefault {
  id = null;
  periodo = {
    dataInicial: "",
    dataFinal: "",
  };
  tempo_diario = 7;
  chamados = [];
  usuarios = [];
  pauses = [];
  jornada = {
    inicio: 8,
    inicioAlmoco: 12,
    finalAlmoco: 14,
    final: 18,
  };
}

export class usuarioDefault {
  id = null;
  nome = "";
  pauses = [];
  tempo = 0;
}

export class chamadosDefault {
  id = null;
  desc = "";
  tarefas = [];
}

export class tarefasDefault {
  id = null;
  id_pessoa = null;
  nome_pessoa = "";
  tempo = 0;
}

export class periodoDefault {
  id = null;
  dataInicial = "";
  dataFinal = "";
  desc = "";
}
