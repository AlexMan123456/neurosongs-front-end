import { useContext, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Home, Login } from "@mui/icons-material";

function Header(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const location = useLocation()
  
    return (<header>
        <Link 
            to="/"
            style={{
                position: "fixed",
                textAlign: "left"
            }}
        >
            <Home/> 
        </Link>
        {isUserSignedIn
        ? 
        <UserDropdown setSignOutError={setSignOutError}/>
        :
        <Link
            to="/sign_in"
            style={{
                position: "fixed",
                textAlign: "right",
                right: "0px",
                top: "0px"
            }}
            >
            <Login/>
        </Link>
        }
        {signOutError ? <p>{signOutError}</p> : null
        }
        <h1>Neurosongs</h1>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}

export default Header