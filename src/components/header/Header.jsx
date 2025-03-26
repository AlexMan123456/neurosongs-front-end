import { useContext, useEffect, useState } from "react"
import Navigation from "../Navigation"
import UserDropdown from "./UserDropdown";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import { Home, Login } from "@mui/icons-material";
import { Avatar, Box, FormControl, FormControlLabel, Switch, useColorScheme } from "@mui/material";
import neurosongs from "../../images/Neurosongs_WebIcon.png"
import NS from "../../images/Neurosongs_NS.png"

function Header(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const {mode, setMode} = useColorScheme();
    const [isDarkByDefault, setIsDarkByDefault] = useState(mode === "dark");
    const [isDarkMode, setIsDarkMode] = useState(isDarkByDefault);

    useEffect(() => {
        setMode(isDarkMode ? "dark" : "light")
    }, [isDarkMode])
  
    return (<header>
        <Box 
            style={{
                    position: "absolute",
                    textAlign: "left",
                    paddingLeft: "10px",
                    marginTop: "-20px",
                    zIndex: 1
                }}
        >
            <Link 
                to="/"
            >
                <img style={{width: "30px", height: "auto"}} src={NS} alt="Return to homepage"/>
            </Link>
            <FormControl>
                <FormControlLabel
                    control={<Switch
                        defaultChecked={isDarkByDefault}
                        value={isDarkMode}
                        onChange={() => {setIsDarkMode((isDarkMode) => {return !isDarkMode})}}
                    />}
                    value="dark-mode-enabled"
                    label="Enable dark mode"
                    labelPlacement= "end"
                />
            </FormControl>
        </Box>
        {isUserSignedIn
        ? 
        <UserDropdown setSignOutError={setSignOutError} isDarkMode={isDarkMode}/>
        :<Box style={{
            position: "absolute",
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