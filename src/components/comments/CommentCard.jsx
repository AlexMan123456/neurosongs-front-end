import { Avatar, Button, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { getUserById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getProfilePictureDirectory from "../../references/get-profile-picture-directory";
import Loading from "../Loading";
import StyledLink from "../styling/StyledLink";
import { UserContext } from "../../contexts/UserContext";
import CommentEditor from "./CommentEditor";

function CommentCard({comment: givenComment}){
    const [comment, setComment] = useState(givenComment);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const {signedInUser} = useContext(UserContext);

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

    function enterEditMode(){
        setIsEditing(true);
    }

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
            primary={<>
                {comment.author.artist_name}
                <Typography sx={{color: "text.secondary", fontSize: "14px"}} component="span"> {comment.created_at}</Typography>
            </>}
            secondary={<>
                
                <StyledLink to={`/users/${comment.user_id}`}>@{comment.author.username}</StyledLink>
                {isEditing ? 
                <>
                    <br/>
                    <CommentEditor
                        comment={comment}
                        setComment={setComment}
                        setIsEditing={setIsEditing}
                    /> 
                </>
                :
                <>
                    <br/>
                    <Typography component="span" sx={{color: "text.primary"}}>{comment.body}</Typography>
                </>}
            </>}
        />
        {signedInUser.user_id === comment.user_id && !isEditing ? <>
            <Button onClick={enterEditMode}>Edit</Button>
            <Button color="error">Delete</Button>
        </> : null}
    </ListItem>)
}

export default CommentCard