export function LoginReducers() {
    return (state: boolean = false, action: string) => {
        switch (action) {
            case "LOGGED_IN":
                return !state;
            default: // need this for default case
                return true
        }
    }
}
