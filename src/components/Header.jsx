import { useContext, useState } from "react"
import Navigation from "./Navigation"
import StyledLink from "./styling/StyledLink"
import { UserContext } from "../contexts/UserContext"
import { Avatar, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header(){
    const {signedInUser} = useContext(UserContext);
    const isUserSignedIn = Object.keys(signedInUser).length !== 0;
    const [displayUserList, setDisplayUserList] = useState(false);
    const navigate = useNavigate()

    function handleViewProfile(){
        setDisplayUserList(false);
        navigate(`/users/${signedInUser.user_id}`)
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
                    <ListItemButton>
                        <ListItemText primary="Sign Out"/>
                    </ListItemButton>
                </ListItem>
            </List>
        : null}
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}
//<StyledLink to={`users/${signedInUser.user_id}`}>View Profile</StyledLink>

export default Header