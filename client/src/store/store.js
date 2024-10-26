import {combineReducers,configureStore} from "@reduxjs/toolkit"
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage"
import userSlice from "./userSlice"
const rootReducer=combineReducers({user:userSlice})
const persistConfig={
    key:'root',
    storage,
    version:1
}
const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({reducer:persistedReducer})

export const persistor=persistStore(store)