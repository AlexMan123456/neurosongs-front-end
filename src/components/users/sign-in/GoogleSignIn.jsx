import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../firebase-config"
import { Button } from "@mui/material"

function GoogleSignIn(){
    const provider = new GoogleAuthProvider()

    function handleSignInWithGoogle(){
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
        })
    }

    return <Button onClick={handleSignInWithGoogle}>Sign in with Google</Button>
}

export default GoogleSignIn