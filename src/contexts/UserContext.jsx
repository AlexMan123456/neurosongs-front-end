import { createContext, useEffect, useState } from "react";
import { getUserByUsername } from "../../api";
import Loading from "../components/Loading";

const UserContext = createContext();

function UserProvider({children}){
    const signedInUserUsername = localStorage.getItem("signedInUser");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [signedInUser, setUser] = useState({});

    function setSignedInUser(user){
        localStorage.setItem("signedInUser", user.username);
        setUser(user);
    }

    useEffect(() => {
        if(signedInUserUsername){
            setIsLoading(true);
            getUserByUsername(signedInUserUsername).then((user) => {
                setIsLoading(false);
                setSignedInUser(user);
            }).catch((err) => {
                setIsLoading(false);
                setError("Error signing in. Please try again later.")
            })
        } else {
            setIsLoading(false);
        }
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return <UserContext.Provider value={{signedInUser, setSignedInUser}}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }