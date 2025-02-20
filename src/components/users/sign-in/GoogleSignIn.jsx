import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../firebase-config"

function GoogleSignIn(){
    const provider = new GoogleAuthProvider()

    function handleSignInWithGoogle(){
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
        })
    }

    return <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
}

export default GoogleSignIn