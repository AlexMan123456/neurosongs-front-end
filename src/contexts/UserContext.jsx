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
        Object.keys(user).length === 0 ? localStorage.removeItem("signedInUserID") : localStorage.setItem("signedInUserID", user.user_id);
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
                setError("Error signing in. Please try again later.");
            })
        } else {
            setIsLoading(false);
        }
    }, [signedInUserID])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return <UserContext.Provider value={{signedInUser, setSignedInUser, isUserSignedIn: Object.keys(signedInUser).length !== 0}}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }