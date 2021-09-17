import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import {chatReducer} from "./chatReducer";


const rootReducer = combineReducers({
    chat: chatReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))



export type AppStateType = ReturnType<typeof rootReducer>
