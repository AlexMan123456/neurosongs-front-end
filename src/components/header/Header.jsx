import { useContext, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useSearchParams } from "react-router-dom";

function Header(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const [searchParams, setSearchParams] = useSearchParams()
  
    return (<header>
        {isUserSignedIn ? <UserDropdown setSignOutError={setSignOutError}/> : <StyledLink to="/sign_in">Sign In</StyledLink>}
        {signOutError ? <p>{signOutError}</p> : null}
        <h1>Neurosongs</h1>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}
//<StyledLink to={`users/${signedInUser.user_id}`}>View Profile</StyledLink>

export default Header