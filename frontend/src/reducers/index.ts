import {combineReducers} from "redux"
import {LoginReducers} from "./LoginReducer";


export const Reducers = combineReducers({
    isLoggedIn : LoginReducers
});
export type RootState = ReturnType<typeof Reducers>