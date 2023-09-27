export const ADD_PROJECT = "ADD_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
export const CHANGE_TASK = "CHANGE_TASK";

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

export const changeTask = (id, task) => ({
  type: CHANGE_TASK,
  id,
  task,
});

export const removeProject = (id) => ({
  type: REMOVE_PROJECT,
  id,
});

export const updateTaskStatus = (
  projectId,
  taskId,
  sourceStatus,
  destinationStatus
) => ({
  type: UPDATE_TASK_STATUS,
  payload: { projectId, taskId, sourceStatus, destinationStatus },
});
