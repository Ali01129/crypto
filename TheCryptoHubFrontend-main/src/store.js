import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'


import CustomerReducer from "./redux/CustomerReducer";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const CustomerReducerPersistance = persistReducer(persistConfig, CustomerReducer);


 const store = configureStore({
  reducer:{CustomerReducer:CustomerReducerPersistance},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})



export default store;