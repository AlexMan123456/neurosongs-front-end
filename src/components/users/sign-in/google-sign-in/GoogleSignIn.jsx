import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../../firebase-config"
import { Button } from "@mui/material"
import { getUserById, postUser } from "../../../../../api"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../../../contexts/UserContext"

function GoogleSignIn({setIsLoading, setError}){
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const {setSignedInUser, setIsSigningInWithGoogle} = useContext(UserContext)

    function handleSignInWithGoogle(){
        setIsLoading(true);
        setIsSigningInWithGoogle(true);
        signInWithPopup(auth, provider).then(({user}) => {
            return getUserById(user.uid).then((userFromDatabase) => {
                setSignedInUser(userFromDatabase);
                setIsLoading(false);
                setIsSigningInWithGoogle(false);
                navigate("/");
            }).catch((err) => {
                if(err.status === 404){
                    setIsLoading(false);
                    return navigate(`/complete_signup_with_google`);
                }
                setError("Google sign in error")
                setIsLoading(false);
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