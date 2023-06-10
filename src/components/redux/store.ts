import {combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});


export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof store.getState>;
