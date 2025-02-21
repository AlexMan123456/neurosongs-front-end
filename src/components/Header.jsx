import { useContext, useState } from "react"
import Navigation from "./Navigation"
import StyledLink from "./styling/StyledLink"
import { UserContext } from "../contexts/UserContext"
import { Avatar, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Header(){
    const {signedInUser, setSignedInUser} = useContext(UserContext);
    const isUserSignedIn = Object.keys(signedInUser).length !== 0;
    const [displayUserList, setDisplayUserList] = useState(false);
    const [signOutError, setSignOutError] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    function handleViewProfile(){
        setDisplayUserList(false);
        navigate(`/users/${signedInUser.user_id}`)
    }

    function handleSignOut(){
        const previousLocationString = `${location.pathname}${location.search}`
        navigate("/loading")
        return signOut(auth)
        .then(() => {
            setSignedInUser({});
        }).catch((err) => {
            setSignOutError("Error signing out. Please try again later.");
        }).finally(() => {
            setDisplayUserList(false);
            navigate(previousLocationString);
        })
    }

    return (<header>
        {isUserSignedIn
        ?
        <Avatar
            src={signedInUser.profile_picture}
            alt={`${signedInUser.username}'s profile picture`}
            onClick={() => {setDisplayUserList((displayUserList) => {return !displayUserList})}}
        />
        :
        <StyledLink to={`/sign_in`}>Sign In</StyledLink>}
        {displayUserList ? 
            <List>
                <ListItem>
                    <ListItemButton onClick={handleViewProfile}>
                        <ListItemText primary="View Profile"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton onClick={handleSignOut}>
                        <ListItemText primary="Sign Out"/>
                    </ListItemButton>
                </ListItem>
            </List>
        : null}
        {signOutError ? <p>{signOutError}</p> : null}
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}
//<StyledLink to={`users/${signedInUser.user_id}`}>View Profile</StyledLink>

export default Header