export const ADD_PROJECT = "ADD_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const ADD_TASK = "ADD_TASK";

export const addProject = (name, id) => ({
  type: ADD_PROJECT,
  name,
  id,
});

export const addTask = (id, task) => ({
  type: ADD_TASK,
  id,
  task,
});

export const removeProject = (id) => ({
  type: REMOVE_PROJECT,
  id,
});
