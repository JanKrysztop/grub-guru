import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import bmrReducer from "./bmrSlice";
import activityReducer from "./activitySlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    bmr: bmrReducer,
    activity: activityReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PURGE", "persist/PERSIST"], // ignore the persist/PURGE action
    },
  }),
});

export const persistor = persistStore(store);
