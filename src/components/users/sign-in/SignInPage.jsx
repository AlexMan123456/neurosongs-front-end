import { useState } from "react";
import StyledLink from "../../styling/StyledLink"
import EmailAndPasswordSignIn from "./EmailAndPasswordSignIn"
import GoogleSignIn from "./GoogleSignIn"
import Loading from "../../Loading";

function SignInPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [signInError, setSignInError] = useState("")

    if(isLoading){
        return <Loading/>
    }

    return (<section>
        <EmailAndPasswordSignIn setIsLoading={setIsLoading} setSignInError={setSignInError}/>
        {signInError === "auth/invalid-email" ? <p>Invalid email. Please try again.</p> : null}
        {signInError === "auth/invalid-credential" ? <p>Invalid email and/or password. Please try again.</p> : null}
        <GoogleSignIn/>
        <p>New to this site? <StyledLink to="/create_account">Create an account</StyledLink></p>
    </section>)
}

export default SignInPage