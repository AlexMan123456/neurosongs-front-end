import { Avatar, Box, Button, ListItem, ListItemText, Popper, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { deleteComment, getUserById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getProfilePictureDirectory from "../../references/get-profile-picture-directory";
import Loading from "../Loading";
import StyledLink from "../styling/StyledLink";
import { UserContext } from "../../contexts/UserContext";
import CommentEditor from "./CommentEditor";
import formatDateAndTime from "../../utils/format-date-and-time";
import wait from "../../utils/wait";
import getRatingColour from "../../utils/get-rating-colour";
import DeletePopup from "../utility/DeletePopup";

function CommentCard({comment: givenComment, setComments}){
    const [comment, setComment] = useState(givenComment);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);

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

    function handleDelete(){
        setIsLoading(true);
        deleteComment(comment.comment_id).then(() => {
            setIsLoading(false);
            setComments((comments) => {
                const commentIndex = comments.map((commentFromArray) => {
                    return commentFromArray.comment_id
                }).indexOf(comment.comment_id)
                
                const newComments = [...comments];
                newComments.splice(commentIndex, 1);
                return newComments;
            });
        }).catch((err) => {
            setIsLoading(false);
            setError("Error deleting comment. Please try again later.")
            return wait(4).then(() => {
                setDeleteError("")
            })
        })
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
            primary={<Box sx={{paddingLeft: "1vw"}}>
                {comment.author.artist_name}
                <Typography sx={{color: "text.secondary", fontSize: "14px"}} component="span"> {formatDateAndTime(new Date(comment.created_at))}</Typography>
            </Box>}
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
                    <br/>
                    {comment.rating ? <Typography component="span" color={getRatingColour(comment.rating)} sx={{fontSize: "14px"}}>Rating: {comment.rating}</Typography> : null}
                </>}
            </>}
        />
        {signedInUser.user_id === comment.user_id && !isEditing ? <>
            <Button onClick={enterEditMode}>Edit</Button>
            <Button color="error" onClick={() => {setShowDeleteBackdrop(true)}}>Delete</Button>
            <DeletePopup
                showMessage={showDeleteBackdrop}
                setShowMessage={setShowDeleteBackdrop}
                onDelete={handleDelete}
            >
                Are you sure you want to delete this comment?
            </DeletePopup>
        </> : null}
        {deleteError ? <Typography>{deleteError}</Typography> : null}
    </ListItem>)
}

export default CommentCard