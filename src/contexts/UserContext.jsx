import { createContext, useEffect, useState } from "react";
import { getUserById } from "../../api";
import Loading from "../components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({children}){
    if(localStorage.getItem("signedInUserID")){
        localStorage.removeItem("signedInUserID");
    }
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [signedInUser, setUser] = useState({});
    const [checkNotifications, setCheckNotifications] = useState(true);
    const [authStateChanged, setAuthStateChanged] = useState(false);

    function setSignedInUser(user){
        setUser(user);
    }

    useEffect(() => {
        if(authStateChanged){
            if(auth.currentUser){
                setIsLoading(true);
                getUserById(auth.currentUser.uid).then((user) => {
                    setIsLoading(false);
                    setSignedInUser(user);
                }).catch((err) => {
                    setIsLoading(false);
                    setError("Error signing in. Please try again later.");
                })
            } else {
                setIsLoading(false);
                setSignedInUser({});
            }
        }
    }, [authStateChanged])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => {
            setAuthStateChanged(true);
        })
        return () => {unsubscribe()}
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return <UserContext.Provider value={{signedInUser, setSignedInUser, isUserSignedIn: Object.keys(signedInUser).length !== 0, checkNotifications, setCheckNotifications}}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }