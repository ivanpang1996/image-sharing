import {AnyAction} from "redux";

export const LoginReducers = (state: boolean = false, action: AnyAction) => {
    switch (action.type) {
        case "LOGGED_IN":
            return true;
        default: // need this for default case
            return false
    }
};

