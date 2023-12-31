import { createStore } from "redux";
import { rootReducer } from "./rootReducer";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../services/local-storage";

const initialState = loadDataFromLocalStorage() || {};

const store = createStore(rootReducer, {
  projects: initialState,
});

store.subscribe(() => {
  const currentState = store.getState();
  saveDataToLocalStorage("myAppData", currentState.projects); // Обновление данных в localStorage
});

export { store };
