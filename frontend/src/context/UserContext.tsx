import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

export interface User {
    email: string
}

interface UserContext {
    user: User | null;
}

const UserContext = createContext<UserContext>({user: null});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get("/abc").then((res) => {
            if (res.data === "") {
                setUser({email: "djdiw"});
            } else {
                setUser(null);
            }
        })
    }, []);
    return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);