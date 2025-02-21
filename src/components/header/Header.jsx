import { useContext, useState } from "react"
import Navigation from "../Navigation"
import StyledLink from "../styling/StyledLink"
import { UserContext } from "../../contexts/UserContext"
import { Avatar, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import wait from "../../utils/wait";
import { getDownloadURL, ref } from "firebase/storage";
import UserDropdown from "./UserDropdown";

function Header(){
    const [signOutError, setSignOutError] = useState("");
  
    return (<header>
        <UserDropdown setSignOutError={setSignOutError}/>
        {signOutError ? <p>{signOutError}</p> : null}
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}
//<StyledLink to={`users/${signedInUser.user_id}`}>View Profile</StyledLink>

export default Header