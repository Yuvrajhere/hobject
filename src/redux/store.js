import { createStore } from "redux";
import { appReducer } from "./app/appReducer";

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const store = createStore(appReducer, persistedState);

store.subscribe(() => {
  saveState({
    projects: store.getState().projects
  });
});

export default store;