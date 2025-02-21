import { createContext, useEffect, useState } from "react";
import { getUserById } from "../../api";
import Loading from "../components/Loading";

const UserContext = createContext();

function UserProvider({children}){
    const signedInUserID = localStorage.getItem("signedInUserID");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [signedInUser, setUser] = useState({});

    function setSignedInUser(user){
        localStorage.setItem("signedInUser", user.user_id);
        setUser(user);
    }

    useEffect(() => {
        if(signedInUserID){
            setIsLoading(true);
            getUserById(signedInUserID).then((user) => {
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