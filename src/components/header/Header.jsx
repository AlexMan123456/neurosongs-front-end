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
import HeaderElements from "./HeaderElements";

function Header(){
    const {mode} = useColorScheme();
    const {isLargeScreen} = useContext(ScreenSizeContext)
  
    return (<header>
        {isLargeScreen ? null : <>
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
            <HeaderElements/>
        </>}
        <div id="heading">
            <h1>
                <Link to="/">
                    <img style={{width: "300px", height: "auto"}} src={neurosongs} alt="Neurosongs"/>
                </Link>
            </h1>
            <p>v{version}</p>
        </div>
        {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation/> : null}
    </header>)
}

export default Header