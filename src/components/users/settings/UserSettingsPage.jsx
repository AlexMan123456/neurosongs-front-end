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
import wait from "../../../utils/wait";
import UserDeletedSuccess from "../sign-in/UserDeletedSuccess";

function UserSettingsPage(){
    const {signedInUser, isUserSignedIn, firebaseUser} = useContext(UserContext);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    
    // This is not being used at the moment. The intent is to try and delete all files and folders from a user's folder, but I can't seem to be getting that to work.
    function deleteFolder(path){
        const userFolder = ref(storage, path);
        return userFolder.listAll().then((userDirectory) => {
            userDirectory.items.forEach((file) => {
                const fullRef = ref(storage, userFolder.fullPath);
                const childRef = fullRef.child(file.name);
                childRef.delete();
            })
            userDirectory.prefixes.forEach((folder) => {
                deleteFolder(folder.fullPath)
            })
        })
    }
    
    async function handleDelete(){
        setIsLoading(true);
        try {
            // await deleteFolder(`${signedInUser.user_id}`);
            await deleteUserFromDatabase(signedInUser.user_id);
            await deleteUser(firebaseUser);
            await wait(2);
            setIsLoading(false);
            setDeleteSuccess(true);
            await wait(2);
            navigate("/");
        } catch(err) {
            console.log(err)
            setError("Error deleting your account. Please try again later.");
            await wait(4);
            setError("");
        }
    }
    
    
    if(isLoading){
        return <Loading/>
    }
    
    if(deleteSuccess){
        return <UserDeletedSuccess/>
    }
    
    if(!isUserSignedIn){
        return <ForbiddenAccess/>
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
            to={`/users/settings/${signedInUser.user_id}/edit_links`}
        >
            <ListItemText primary="Edit Links"/>
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
        {error ? <p>{error}</p> : null}
    </>)
}

export default UserSettingsPage