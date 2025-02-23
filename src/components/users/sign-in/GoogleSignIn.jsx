import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../firebase-config"
import { Button } from "@mui/material"
import { getUserById, postUser } from "../../../../api"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import VerifyDateOfBirth from "./VerifyDateOfBirth"

function GoogleSignIn({setUserToVerify, setIsLoading, setError}){
    const provider = new GoogleAuthProvider();
    const location = useLocation()
    const navigate = useNavigate();
    const {setSignedInUser} = useContext(UserContext)

    function handleSignInWithGoogle(){
        setIsLoading(true);
        signInWithPopup(auth, provider).then(({user}) => {
            return getUserById(user.uid).then((userFromDatabase) => {
                setIsLoading(false);
                setSignedInUser(userFromDatabase);
                navigate("/");
            }).catch((err) => {
                setIsLoading(false);
                if(err.status === 404){
                    setUserToVerify(user);
                    navigate(`${location.pathname}?verify_dob_of_user=${user.uid}`);
                    return;
                }
                setError("Google sign in error")
            })
        })
    }

    return <Button 
        variant="contained"
        onClick={handleSignInWithGoogle}
        sx={{backgroundColor: "red"}}
        >
            Sign in with Google
        </Button>
}

export default GoogleSignIn