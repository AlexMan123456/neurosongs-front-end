import { Box, useColorScheme } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { version } from "../../../package.json";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";
import neurosongs from "../../images/Neurosongs_WebIcon.png";
import homepageIcon from "../../images/Neurosongs_note.png";
import HeaderElements from "./HeaderElements";

function Header(){
    const {mode} = useColorScheme();
    const {isLargeScreen} = useContext(ScreenSizeContext)
  
    return (<header>
        {isLargeScreen ? null : <Box display="flex">
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
        </Box>}
        <div id="heading">
            <h1>
                <Link to="/">
                    <img style={{width: "300px", height: "auto"}} src={neurosongs} alt="Neurosongs"/>
                </Link>
            </h1>
            <p>v{version}</p>
        </div>
    </header>)
}

export default Header