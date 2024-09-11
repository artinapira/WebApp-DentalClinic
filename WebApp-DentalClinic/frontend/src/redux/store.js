import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'; // Import thunk middleware correctly
import { rootReducer } from "./index.js";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem("store1", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = window.localStorage.getItem("store1");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

export const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
