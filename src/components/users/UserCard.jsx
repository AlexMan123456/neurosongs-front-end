import { Avatar, ListItem, ListItemText } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase-config";
import getProfilePictureDirectory from "../../references/get-profile-picture-directory";
import Loading from "../Loading";
import StyledLink from "../styling/StyledLink";

function UserCard({user}){
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const profilePictureRef = ref(storage, getProfilePictureDirectory(user));
        getDownloadURL(profilePictureRef).then((profilePictureURL) => {
            setProfilePicture(profilePictureURL);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }
    
    return (<ListItem sx={{border: 0.5, borderRadius: 0.7}}>
        <Avatar src={profilePicture} alt={`${user.username}'s profile picture`}/>
        <ListItemText primary={<>
        {user.artist_name} <br/> <StyledLink to={`/users/${user.user_id}`}>@{user.username}</StyledLink>
        </>}/>
    </ListItem>)
}

export default UserCard