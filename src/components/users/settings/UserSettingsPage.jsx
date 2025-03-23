import { Box, Button, Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import DeletePopup from "../../utility/DeletePopup";
import Markdown from "react-markdown";
import { deleteUser } from "firebase/auth";
import { deleteUserFromDatabase } from "../../../../api";
import { deleteObject, ref } from "firebase/storage";
import getSongDirectory from "../../../references/get-song-directory";
import { storage } from "../../../firebase-config";
import Loading from "../../Loading";


function UserSettingsPage(){
    const {signedInUser, isUserSignedIn, firebaseUser} = useContext(UserContext);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    if(!isUserSignedIn){
        return <ForbiddenAccess/>
    }

    async function handleDelete(){
        setIsLoading(true);
        const userDirectory = ref(storage, `/${signedInUser.user_id}`);
        console.log(userDirectory)
        await deleteObject(userDirectory);
        await deleteUserFromDatabase(signedInUser.user_id)
        await deleteUser(firebaseUser)
        setIsLoading(false);
        navigate("/")
    }

    if(isLoading){
        return <Loading/>
    }

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
        <Button color="error" onClick={() => {setShowDeleteWarning(true)}}>Delete account</Button>
        <DeletePopup
            showMessage={showDeleteWarning}
            setShowMessage={setShowDeleteWarning}
            onDelete={handleDelete}
        >
            <Markdown>
            Are you sure you want to delete your account?  
            **This process cannot be undone!**
            </Markdown>
        </DeletePopup>
    </>)
}

export default UserSettingsPage