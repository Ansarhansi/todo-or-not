export const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
export const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));
export const getUsername = () => localStorage.getItem("username") || "";
export const saveUsername = (name) => localStorage.setItem("username", name);
