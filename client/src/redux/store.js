import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReduser = combineReducers({ user:userReducer})

const presistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(presistConfig,rootReduser);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const presistor = persistStore(store);