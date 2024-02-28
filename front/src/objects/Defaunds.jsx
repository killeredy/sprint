export class sprintDefault {
  id = null;
  periodo = {
    inicio: "",
    final: "",
  };
  jornada = {
    inicio: 8,
    inicioAlmoco: 12,
    finalAlmoco: 14,
    final: 18,
  };
  chamados = [];
  usuarios = [];
  pauses = [];
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
  numero = "";
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
  dataInicial = "0000-00-00 08:00";
  dataFinal = "0000-00-00 18:00";
  desc = "";
}

export class pauseDefault {
  id = null;
  dataInicial = "0000-00-00 08:00";
  dataFinal = "0000-00-00 18:00";
  desc = "";
}
