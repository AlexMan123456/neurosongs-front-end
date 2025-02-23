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
                setIsLoading(false);
                setSignedInUser(userFromDatabase);
                navigate("/");
            }).catch((err) => {
                setIsLoading(false);
                if(err.status === 404){
                    postUser({
                        user_id: user.uid,
                        artist_name: user.displayName,
                        username: user.uid,
                        email: user.email
                    }).then((userFromDatabase) => {
                        setSignedInUser(userFromDatabase);
                        navigate("/");
                    })
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