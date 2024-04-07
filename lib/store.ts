import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit'

import { authSlice } from './slices/auth'
import { uiSlice } from './slices/ui'

const reducers = combineReducers({
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const makeStore = () => {
    return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})
}

export const makePersistor = (store: ReturnType<typeof makeStore>) => {
    return persistStore(store)
}

export const makeStoreWithPersistor = () => {
    const store = makeStore()
    const persistor = makePersistor(store)
    return { store, persistor }
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
