export function GetUsersLocalList() {
  const stringUsers = localStorage.getItem("studeSprintUser");
  const users =
    stringUsers != undefined && stringUsers != ""
      ? JSON.parse(stringUsers)
      : [];
  return users;
}
