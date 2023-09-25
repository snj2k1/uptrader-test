import { ADD_PROJECT, REMOVE_PROJECT, ADD_TASK } from "./projects-actions";

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
    default:
      return state;
  }
};
