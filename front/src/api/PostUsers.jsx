export function PostUsers($list) {
  const url = import.meta.env.VITE_URL_API + "user";
  const userSend = $list.map((elem) => {
    return {
      id: elem.id,
      nome: elem.nome,
      matricula: elem.matricula,
    };
  });

  fetch(url, {
    method: "POST",
    body: JSON.stringify(userSend),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(["resp:", json]);
    })
    .catch((err) => console.log("Erro de solicitação", err));
}
