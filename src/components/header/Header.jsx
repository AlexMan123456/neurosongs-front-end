import { useContext, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useLocation, useSearchParams } from "react-router-dom";

function Header(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const location = useLocation()
    console.log(location.pathname)
  
    return (<header>
        {location.pathname !== "/" ? <StyledLink to="/">Back to homepage</StyledLink> : null}
        {isUserSignedIn ? <UserDropdown setSignOutError={setSignOutError}/> : <StyledLink to="/sign_in">Sign In</StyledLink>}
        {signOutError ? <p>{signOutError}</p> : null}
        <h1>Neurosongs</h1>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}

export default Header