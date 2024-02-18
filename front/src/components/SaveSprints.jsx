import getSprintList from "./GetSprintList";

export default function SaveSprints($id) {
  const list = getSprintList();
  if (list != undefined) {
    const sprint = list.filter((elem) => elem.id == $id);
    if (sprint != undefined) {
      return sprint;
    }
  }

  return {};
}
