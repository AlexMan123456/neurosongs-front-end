import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../firebase-config"

function SignInPage(){
    const provider = new GoogleAuthProvider()

    function handleSignInWithGoogle(){
        signInWithPopup(auth, provider).then((result) => {
            
        })
    }

    return <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
}

export default SignInPage