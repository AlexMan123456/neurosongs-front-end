import StyledLink from "../../styling/StyledLink"
import EmailOrUsernameAndPasswordSignIn from "./EmailOrUsernameAndPasswordSignIn"
import GoogleSignIn from "./GoogleSignIn"

function SignInPage(){
    return (<section>
        <EmailOrUsernameAndPasswordSignIn/>
        <GoogleSignIn/>
        <p>New to this site? <StyledLink to="/create-account">Create an account</StyledLink></p>
    </section>)
}

export default SignInPage