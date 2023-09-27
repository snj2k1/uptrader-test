import {
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_TASK,
  UPDATE_TASK_STATUS,
  CHANGE_TASK,
} from "./projects-actions";

export const projectsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      const newProject = {
        [action.id]: {
          name: action.name,
          tasks: [],
        },
      };
      return {
        ...state,
        ...newProject,
      };
    }
    case REMOVE_PROJECT: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case ADD_TASK: {
      const newState = {
        ...state,
        [action.id]: {
          ...state[action.id],
          tasks: [...state[action.id].tasks, action.task],
        },
      };
      return newState;
    }
    case CHANGE_TASK: {
      const newState = {
        ...state,
        [action.id]: {
          ...state[action.id],
          tasks: [
            ...state[action.id].tasks.map((el) =>
              Number(el.id) === Number(action.task.id) ? action.task : el
            ),
          ],
        },
      };
      return newState;
    }
    case UPDATE_TASK_STATUS: {
      const { projectId, taskId, sourceStatus, destinationStatus } =
        action.payload;
      const updatedState = {
        ...state,
        [projectId]: {
          ...state[projectId],
          tasks: state[projectId]["tasks"].map((task) => {
            if (Number(task.id) === Number(taskId)) {
              return {
                ...task,
                status: destinationStatus,
              };
            }
            return { ...task };
          }),
        },
      };
      return updatedState;
    }
    default:
      return state;
  }
};
