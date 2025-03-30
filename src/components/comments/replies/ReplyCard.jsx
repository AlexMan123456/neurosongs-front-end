import { Avatar, Box, Button, ListItem, ListItemText, Popper, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { deleteComment, getRatingByIds, getUserById } from "../../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase-config";
import getProfilePictureDirectory from "../../../references/get-profile-picture-directory";
import Loading from "../../Loading";
import StyledLink from "../../styling/StyledLink";
import { UserContext } from "../../../contexts/UserContext";
import CommentEditor from "../CommentEditor";
import formatDateAndTime from "../../../utils/format-date-and-time";
import wait from "../../../utils/wait";
import getRatingColour from "../../../utils/get-rating-colour";
import DeletePopup from "../../utility/DeletePopup";
import Markdown from "react-markdown";
import { formatMarkdownWithLineBreaks } from "#utils";

function ReplyCard({reply: givenReply, setReplies, ratingVisibilityUpdated}){
    const [reply, setReply] = useState(givenReply);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const [rating, setRating] = useState({});

    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        getUserById(reply.user_id).then((user) => {
            const profilePictureRef = ref(storage, getProfilePictureDirectory(user));
            return getDownloadURL(profilePictureRef);
        }).then((profilePictureURL) => {
            setIsLoading(false);
            setProfilePicture(profilePictureURL);
        }).catch((err) => {
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        const contentType = reply.replying_to.song ? "song" : "album";
        getRatingByIds(contentType + "s", reply.user_id, reply.replying_to[contentType][`${contentType}_id`]).then((rating) => {
            setRating(rating);
        })
    }, [ratingVisibilityUpdated])

    function enterEditMode(){
        setIsEditing(true);
    }

    function handleDelete(){
        setIsLoading(true);
        deleteComment(reply.comment_id).then(() => {
            setIsLoading(false);
            setReplies((comments) => {
                const commentIndex = comments.map((commentFromArray) => {
                    return commentFromArray.comment_id
                }).indexOf(reply.comment_id)
                
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
    >
        {!isLoading ? <Avatar src={profilePicture}/> : <Loading/>} 
        <ListItemText
            slotProps={{
                secondary: {
                    display: "grid"
                }
            }}
            primary={<Typography sx={{paddingLeft: "1vw", color: "text.primary"}}>
                {reply.author.artist_name}
            </Typography>}
            secondary={<>
                <StyledLink to={`/users/${reply.user_id}`}>@{reply.author.username}</StyledLink>
                <Typography sx={{color: "text.secondary", fontSize: "14px"}} component="span"> {formatDateAndTime(new Date(reply.created_at))}</Typography>
                {isEditing ? 
                <>
                    <CommentEditor
                        comment={reply}
                        setComment={setReply}
                        setIsEditing={setIsEditing}
                    /> 
                </>
                :
                <>
                    <Typography sx={{color: "text.primary", paddingLeft: "0px"}}>
                        <Markdown>
                            {formatMarkdownWithLineBreaks(reply.body)}
                        </Markdown>
                    </Typography>
                    <Box>
                        {rating.is_visible ? <Typography component="span" color={getRatingColour(rating.score)} sx={{fontSize: "14px"}}>Rating: {rating.score}</Typography> : null}
                    </Box>
                </>}
            </>}
        />
        {signedInUser.user_id === reply.user_id && !isEditing ? <>
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

export default ReplyCard