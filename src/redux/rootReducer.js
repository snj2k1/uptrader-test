import { combineReducers } from "redux";
import { projectsReducer } from "./projects/projects-reducer";
import { editReducer } from "./edit/edit-reducer";

export const rootReducer = combineReducers({
  projects: projectsReducer,
  edit: editReducer,
});
