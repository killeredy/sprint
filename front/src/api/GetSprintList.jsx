import { sprintDefault } from "../objects/Defaunds";

export default function GetSprintList() {
  const stringSprint = localStorage.getItem("studeSprint");
  const sprint =
    stringSprint != undefined && stringSprint != ""
      ? JSON.parse(stringSprint)
      : [];
  return sprint;
}
