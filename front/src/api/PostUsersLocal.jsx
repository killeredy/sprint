export function PostUsersLocal(list) {
  localStorage.setItem("studeSprintUser", JSON.stringify(list));
}
