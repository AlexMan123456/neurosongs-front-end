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
    const {setSignedInUser} = useContext(UserContext)

    function handleSignInWithGoogle(){
        setIsLoading(true);
        signInWithPopup(auth, provider).then(({user}) => {
            return getUserById(user.uid).then((userFromDatabase) => {
                setSignedInUser(userFromDatabase);
                setIsLoading(false);
                navigate("/");
            }).catch((err) => {
                if(err.status === 404){
                    return postUser({
                        user_id: user.uid,
                        artist_name: user.displayName,
                        username: user.uid,
                        email: user.email
                    }).then((userFromDatabase) => {
                        setSignedInUser(userFromDatabase);
                        setIsLoading(false);
                        navigate("/");
                    })
                }
                setIsLoading(false);
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