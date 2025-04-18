import { createContext, useEffect, useState } from "react";
import { getUserById } from "../../api";
import Loading from "../components/Loading";
import { isSignInWithEmailLink, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

function UserProvider({children}){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [signedInUser, setSignedInUser] = useState({});
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [checkNotifications, setCheckNotifications] = useState(true);
    const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);
    
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
        if(firebaseUser && !isSignInWithEmailLink(auth, window.location.href) && !isSigningInWithGoogle){
            setIsLoading(true);
            getUserById(firebaseUser.uid).then((user) => {
                setIsLoading(false);
                setSignedInUser(user);
            }).catch((error) => {
                async function handleError(){
                    if(error.status === 404){
                        await signOut(auth)
                    }
                    setIsLoading(false);
                    setError("Error signing in. Please try again later.");
                }
                handleError()
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

    return <UserContext.Provider value={{signedInUser, setSignedInUser, firebaseUser, isUserSignedIn: Object.keys(signedInUser).length !== 0, checkNotifications, setCheckNotifications, setIsSigningInWithGoogle}}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }