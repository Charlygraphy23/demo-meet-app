import { configureStore} from "@reduxjs/toolkit";
import Reducers from './reducers'


const store = configureStore({
    reducer : Reducers,
    middleware : getMiddleware => getMiddleware({
        serializableCheck : false
    })
})

export type StoreType =  ReturnType<typeof store.getState>

export default store