import { useContext } from "react"
import Navigation from "./Navigation"
import StyledLink from "./styling/StyledLink"
import { UserContext } from "../contexts/UserContext"

function Header(){
    const {signedInUser} = useContext(UserContext);
    const isUserSignedIn = Object.keys(signedInUser).length !== 0;
    return (<header>
        {isUserSignedIn ? <StyledLink to={`users/${signedInUser.user_id}`}>View Profile</StyledLink> : <StyledLink to={`/sign_in`}>Sign In</StyledLink>}
        {isUserSignedIn ? <p>Signed in as {signedInUser.artist_name}</p> : null}
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}

export default Header