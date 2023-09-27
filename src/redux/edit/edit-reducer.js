import { TOGGLE_EDIT } from "./edit-actions";

export const editReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return state === false ? true : false;
    default:
      return state;
  }
};
