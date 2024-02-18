import getSprintList from "./GetSprintList";

export default function PostSprint($sprint) {
  let list = getSprintList();
  const id = $sprint.id;

  if (id == null) {
    $sprint.id = list.length + 1;
    list.push($sprint);
  } else {
    const oldSprint = list.filter((elem) => elem.id == id)[0];
    const index = list.indexOf(oldSprint);
    list[index] = $sprint;
  }

  localStorage.setItem("studeSprint", JSON.stringify(list));
}

const handleSaveSprint = () => {
  const newSprints = JSON.stringify(sprint);
  localStorage.setItem("sprint", newSprints);

  const url = import.meta.env.VITE_URL_API + "sprint";

  fetch(url, {
    method: "POST",
    body: newSprints,
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => console.log("Erro de solicitação", err));
};
