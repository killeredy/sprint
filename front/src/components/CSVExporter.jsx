import React from "react";
import Papa from "papaparse";

function CSVExporter({ data, filename }) {
  const getTarefas = (chamados) => {
    let list = [];
    for (let i = 0; i < chamados.length; i++) {
      let numero = chamados[i].numero;
      let tarefas = chamados[i].tarefas;
      for (let k = 0; k < tarefas.length; k++) {
        list.push({
          chamado: numero,
          usuario: tarefas[k].nome_pessoa,
          tempo: tarefas[k].tempo + " horas",
        });
      }
    }

    return list;
  };

  const exportCSV = () => {
    const csv = Papa.unparse(getTarefas(data));
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", filename || "export.csv");
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <button onClick={exportCSV} className="btn btn-secondary">
      Exportar CSV
    </button>
  );
}

export default CSVExporter;
