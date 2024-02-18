import getSprintList from "./GetSprintList";

export default function GetSprint($id) {
  const list = getSprintList();
  if (list != undefined) {
    const sprint = list.filter((elem) => elem.id == $id)[0];
    if (sprint != undefined) {
      return sprint;
    }
  }

  return {};
}
