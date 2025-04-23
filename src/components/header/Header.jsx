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
        {isLargeScreen ? null : <Box display="flex" alignItems="center">
            <Link 
                to="/"
            >
                <img style={{width: "30px", height: "auto", paddingLeft: "5px"}} src={homepageIcon} alt="Return to homepage"/>
            </Link>
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