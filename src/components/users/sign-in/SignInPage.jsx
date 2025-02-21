import StyledLink from "../../styling/StyledLink"
import EmailAndPasswordSignIn from "./EmailAndPasswordSignIn"
import GoogleSignIn from "./GoogleSignIn"

function SignInPage(){
    return (<section>
        <EmailAndPasswordSignIn/>
        <GoogleSignIn/>
        <p>New to this site? <StyledLink to="/create_account">Create an account</StyledLink></p>
    </section>)
}

export default SignInPage