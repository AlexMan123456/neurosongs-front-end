import { useContext, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import { Home, Login } from "@mui/icons-material";
import { Box } from "@mui/material";
import neurosongs from "../../images/Neurosongs_WebIcon.png"
import StyledImage from "../styling/StyledImage";

function Header(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
  
    return (<header>
        <Link 
            to="/"
            style={{
                position: "fixed",
                textAlign: "left",
                zIndex: 1
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
        <h1>
            <img style={{width: "300px", height: "auto"}} src={neurosongs} alt="Neurosongs"/>
        </h1>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}

export default Header