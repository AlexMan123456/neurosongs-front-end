import { Login } from "@mui/icons-material";
import { Box, FormControl, FormControlLabel, Switch, useColorScheme } from "@mui/material";
import { isSignInWithEmailLink } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { version } from "../../../package.json";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";
import { UserContext } from "../../contexts/UserContext";
import { auth } from "../../firebase-config";
import neurosongs from "../../images/Neurosongs_WebIcon.png";
import homepageIcon from "../../images/Neurosongs_note.png";
import Navigation from "../Navigation";
import StyledLink from "../styling/StyledLink";
import UserDropdown from "./UserDropdown";

function Header(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const {mode, setMode} = useColorScheme();
    const [isDarkByDefault, setIsDarkByDefault] = useState(mode === "dark");
    const [isDarkMode, setIsDarkMode] = useState(isDarkByDefault);
    const {isLargeScreen} = useContext(ScreenSizeContext)

    useEffect(() => {
        setMode(isDarkMode ? "dark" : "light")
    }, [isDarkMode])
  
    return (<header>
        <Box 
            style={{
                    position: "absolute",
                    textAlign: "left",
                    paddingLeft: "10px",
                    zIndex: 1
                }}
        >
            <Link 
                to="/"
            >
                <img style={{width: "30px", height: "auto"}} src={homepageIcon} alt="Return to homepage"/>
            </Link>
        </Box>
        <FormControl sx={{marginLeft: isLargeScreen ? "45%" : "25%"}}>
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
        {isUserSignedIn
        ? 
        <UserDropdown setSignOutError={setSignOutError} isDarkMode={isDarkMode}/>
        :<Box style={{
            position: "absolute",
            textAlign: "right",
            right: "0px",
            top: "0px"
        }}>
            <StyledLink
                to="/sign_in"
                >
                <Login/>
            </StyledLink>
            <StyledLink to="/sign_in">Sign in</StyledLink>
        </Box>
        }
        {signOutError ? <p>{signOutError}</p> : null
        }
        <div id="heading">
            <h1>
                <Link to="/featured">
                    <img style={{width: "300px", height: "auto"}} src={neurosongs} alt="Neurosongs"/>
                </Link>
            </h1>
            <p>v{version}</p>
        </div>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}

export default Header