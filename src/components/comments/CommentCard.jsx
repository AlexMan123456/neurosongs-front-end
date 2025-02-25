import { Avatar, Button, ListItem, ListItemText, Popper, TextField, Typography } from "@mui/material"
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

function CommentCard({comment: givenComment, setComments}){
    const [comment, setComment] = useState(givenComment);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);
    const [deleteError, setDeleteError] = useState("")

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

    function handleDisplayDeleteConfirmation(event){
        setAnchorElement((anchorElement) => {
            return anchorElement ? null : event.currentTarget;
        });
    }

    const open = !!anchorElement;
    const deletePopupID = open ? "delete-popup" : undefined;

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
                <Typography sx={{color: "text.secondary", fontSize: "14px"}} component="span"> {formatDateAndTime(new Date(comment.created_at))}</Typography>
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
                    <br/>
                    {comment.rating ? <Typography component="span" color={getRatingColour(comment.rating)} sx={{fontSize: "14px"}}>Rating: {comment.rating}</Typography> : null}
                </>}
            </>}
        />
        {signedInUser.user_id === comment.user_id && !isEditing ? <>
            <Button onClick={enterEditMode}>Edit</Button>
            <Button aria-describedby={deletePopupID} color="error" onClick={handleDisplayDeleteConfirmation}>Delete</Button>
            <Popper id={deletePopupID} open={open} anchorEl={anchorElement}>
                Are you sure you want to delete this comment?
                <br/>
                <Button color="success" onClick={handleDelete}>Yes</Button>
                <Button color="error" onClick={() => {setAnchorElement(null)}}>No</Button>
            </Popper>
        </> : null}
        {deleteError ? <Typography>{deleteError}</Typography> : null}
    </ListItem>)
}

export default CommentCard