import GetUsersLocalList from "./GetUsersLocalList";

export default function GetUsersLocal($id) {
  const users = GetUsersLocalList();
  if (list != undefined) {
    const users = list.filter((elem) => elem.id == $id)[0];
    if (users != undefined) {
      return users;
    }
  }

  return {};
}
