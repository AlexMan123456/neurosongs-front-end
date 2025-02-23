import { Divider, List, ListItemButton, ListItemText } from "@mui/material"
import UserDisplayInfoEditPage from "./UserDisplayInfoEditPage"
import StyledLink from "../../styling/StyledLink"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { useNavigate } from "react-router-dom"


function UserSettingsPage(){
    const {signedInUser} = useContext(UserContext);
    const navigate = useNavigate()

    return (<>
    <List sx={{
            width: "20vw",
            border: 0.5
        }}
    >
        <ListItemButton onClick={() => {navigate(`/users/settings/${signedInUser.user_id}/edit_display`)}}>
            <StyledLink to={`/users/settings/${signedInUser.user_id}/edit_display`}>Edit Display Information</StyledLink>
        </ListItemButton>
        <Divider/>
        <ListItemButton onClick={() => {navigate(`/users/settings/${signedInUser.user_id}/edit_date_of_birth`)}}>
            <StyledLink to={`/users/settings/${signedInUser.user_id}/edit_date_of_birth`}>Edit Date of Birth</StyledLink>
        </ListItemButton>
    </List>
    </>)
}

export default UserSettingsPage