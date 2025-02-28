import { useContext, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Home, Login } from "@mui/icons-material";
import { Box } from "@mui/material";

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
        :<Box style={{
            position: "fixed",
            textAlign: "right",
            right: "0px",
            top: "0px"
        }}>
            <Link
                to="/sign_in"
                
                >
                <Login/>
            </Link>
            <StyledLink to="/sign_in">Sign in</StyledLink>
        </Box>
        }
        {signOutError ? <p>{signOutError}</p> : null
        }
        <h1>Neurosongs</h1>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}

export default Header