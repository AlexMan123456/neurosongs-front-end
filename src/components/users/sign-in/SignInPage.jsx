import { useState } from "react";
import StyledLink from "../../styling/StyledLink"
import EmailAndPasswordSignIn from "./EmailAndPasswordSignIn"
import GoogleSignIn from "./GoogleSignIn"
import Loading from "../../Loading";
import VerifyDateOfBirth from "./VerifyDateOfBirth";
import { useSearchParams } from "react-router-dom";

function SignInPage(){
    const [searchParams, setSearchParams] = useSearchParams()
    const verify_dob_of_user = searchParams.get("verify_dob_of_user")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userToVerify, setUserToVerify] = useState({})

    if(isLoading){
        return <Loading/>
    }

    if(verify_dob_of_user){
        return <VerifyDateOfBirth searchParams={searchParams} user={userToVerify} setIsLoading={setIsLoading} setError={setError}/>
    }

    if(error){
        if(error !== "auth/invalid-email" && error !== "auth/invalid-credential"){
            return <p>{error}</p>
        }
    }

    return (<section>
        <EmailAndPasswordSignIn setIsLoading={setIsLoading} setSignInError={setError}/>
        {error === "auth/invalid-email" ? <p>Invalid email. Please try again.</p> : null}
        {error === "auth/invalid-credential" ? <p>Invalid email and/or password. Please try again.</p> : null}
        <br/>
        <br/>
        <GoogleSignIn setUserToVerify={setUserToVerify} setIsLoading={setIsLoading} setError={setError}/>
        {error === "Google sign in error" ? <p>Error signing in with Google. Please try again later.</p> : null}
        <p>New to this site? <StyledLink to="/create_account">Create an account</StyledLink></p>
    </section>)
}

export default SignInPage