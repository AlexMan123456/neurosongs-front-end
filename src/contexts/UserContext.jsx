import { createContext, useEffect, useState } from "react";
import { getUserById } from "../../api";
import Loading from "../components/Loading";
import { isSignInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({children}){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [signedInUser, setSignedInUser] = useState({});
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [checkNotifications, setCheckNotifications] = useState(true);
    
    useEffect(() => {
        if(localStorage.getItem("signedInUserID")){
            localStorage.removeItem("signedInUserID");
        }
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
        })
        return () => {unsubscribe()}
    }, [])

    useEffect(() => {
        if(firebaseUser && !isSignInWithEmailLink(auth, window.location.href)){
            setIsLoading(true);
            getUserById(firebaseUser.uid).then((user) => {
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
    }, [firebaseUser])


    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return <UserContext.Provider value={{signedInUser, setSignedInUser, firebaseUser, isUserSignedIn: Object.keys(signedInUser).length !== 0, checkNotifications, setCheckNotifications}}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }