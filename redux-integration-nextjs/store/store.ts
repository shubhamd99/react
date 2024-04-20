import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import reducers from './reducer/reducers';


const persistSettings = {
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    // immutableCheck: false,
};

const isDev = process.env.NODE_ENV === "development";

export default function storeConfig() {
    const store = configureStore({
        reducer: reducers,
        devTools: isDev,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(persistSettings),
    });

    const persistor = persistStore(store);

    return { store, persistor };
}