import { Avatar, Button, ListItem, ListItemText } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { getUserById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getProfilePictureDirectory from "../../references/get-profile-picture-directory";
import Loading from "../Loading";
import StyledLink from "../styling/StyledLink";
import { UserContext } from "../../contexts/UserContext";

function CommentCard({comment}){
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {signedInUser} = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true);
        getUserById(comment.user_id).then((user) => {
            const profilePictureRef = ref(storage, getProfilePictureDirectory(user));
            return getDownloadURL(profilePictureRef);
        }).then((profilePictureURL) => {
            setIsLoading(false);
            setProfilePicture(profilePictureURL);
        }).catch((err) => {
            setIsLoading(false);
        })
    }, [])

    return (<ListItem
        alignItems="flex-start"
        sx={{
            padding: "35vw 30pvh",
            border: 0.5,
            borderRadius: 0.7
        }}
    >
        {!isLoading ? <Avatar src={profilePicture}/> : <Loading/>}
        <ListItemText 
            primary={comment.author.artist_name}
            secondary={<>
                <StyledLink to={`/users/${comment.user_id}`}>@{comment.author.username}</StyledLink>
                <ListItemText
                    sx={{color: "black"}}
                    primary={comment.body}
                />
            </>}
        />
        {signedInUser.user_id === comment.user_id ? <>
            <Button>Edit</Button><Button color="error">Delete</Button>
        </> : null}
    </ListItem>)
}

export default CommentCard