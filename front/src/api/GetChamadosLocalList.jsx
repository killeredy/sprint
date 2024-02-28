export function GetChamadosLocalList() {
  const stringUsers = localStorage.getItem("studeSprintChamados");
  const users =
    stringUsers != undefined && stringUsers != ""
      ? JSON.parse(stringUsers)
      : [];
  return users;
}
