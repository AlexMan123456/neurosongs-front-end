import { useContext, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";

function Header(){
    const {signedInUser} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const isUserSignedIn = Object.keys(signedInUser).length !== 0;
  
    return (<header>
        {isUserSignedIn ? <UserDropdown setSignOutError={setSignOutError}/> : <StyledLink to="/sign_in">Sign In</StyledLink>}
        {signOutError ? <p>{signOutError}</p> : null}
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}
//<StyledLink to={`users/${signedInUser.user_id}`}>View Profile</StyledLink>

export default Header