import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './index'; // Your rootReducer file

// Set up types for RootState and AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Typed versions of useDispatch and useSelector hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppState = ReturnType<typeof store.getState>;

// Define an AppThunk type for async action creators
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Local storage save function
function saveToLocalStorage(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem('store1', serializedState);
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// Local storage load function
function loadFromLocalStorage(): Partial<RootState> | undefined {
  try {
    const serializedState = window.localStorage.getItem('store1');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState) as Partial<RootState>;
  } catch (e) {
    console.error('Failed to load state:', e);
    return undefined;
  }
}

// Load state from localStorage
const persistedState = loadFromLocalStorage();

// Create the store using configureStore
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(), // You can add custom middleware here
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store changes to persist state
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
