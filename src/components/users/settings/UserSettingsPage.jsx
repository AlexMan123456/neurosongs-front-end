import { Divider, List, ListItemButton, ListItemText } from "@mui/material"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { Link } from "react-router-dom"


function UserSettingsPage(){
    const {signedInUser} = useContext(UserContext);

    return (<>
    <List sx={{
            border: 0.5,
            borderRadius: 0.7
        }}
    >
        <ListItemButton
            component={Link}
            to={`/users/settings/${signedInUser.user_id}/edit_display`}
        >
            <ListItemText primary="Edit Display Information"/>
        </ListItemButton>
        <Divider/>
        <ListItemButton
            component={Link}
            to={`/users/settings/${signedInUser.user_id}/edit_date_of_birth`} 
        >
            <ListItemText primary="Edit Date of Birth"/>
        </ListItemButton>
    </List>
    </>)
}

export default UserSettingsPage