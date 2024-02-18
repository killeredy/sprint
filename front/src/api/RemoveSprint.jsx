import getSprintList from "./GetSprintList";

export default function RemoveSprint($sprintId) {
  let list = getSprintList();
  const newSprintList = list.filter((elem) => elem.id !== $sprintId);
  localStorage.setItem("studeSprint", JSON.stringify(newSprintList));
  return newSprintList;
}
