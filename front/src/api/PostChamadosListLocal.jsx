export function PostChamadosListLocal(list) {
  localStorage.setItem("studeSprintChamados", JSON.stringify(list));
}
