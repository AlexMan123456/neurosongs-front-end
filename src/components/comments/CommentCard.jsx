import { Avatar, Box, Button, ListItem, ListItemText, Popper, TextField, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { deleteComment, getRatingByIds, getUserById } from "../../../api";
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
import ReplyCreator from "./replies/ReplyCreator";
import RepliesList from "./replies/RepliesList";
import { formatMarkdownWithLineBreaks } from "#utils";
import Markdown from "react-markdown";

function CommentCard({comment: givenComment, setComments, ratingVisibilityUpdated}){
    const [comment, setComment] = useState(givenComment);
    const [replyCount, setReplyCount] = useState(givenComment.reply_count);
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const [rating, setRating] = useState({});
    const [isReplying, setIsReplying] = useState(false);
    const [replies, setReplies] = useState([]);

    const {isUserSignedIn, signedInUser} = useContext(UserContext);

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

    useEffect(() => {
        const contentType = comment.song_id ? "song" : "album";
        getRatingByIds(contentType + "s", comment.user_id, comment[`${contentType}_id`]).then((rating) => {
            setRating(rating);
        })
    }, [ratingVisibilityUpdated])

    useEffect(() => {
        setReplyCount(replies.length);
    }, [replies])

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
            slotProps={{
                secondary: {
                    display: "grid"
                }
            }}
            primary={<Box sx={{paddingLeft: "1vw"}}>
                {comment.author.artist_name}
            </Box>}
            secondary={<>
                <StyledLink to={`/users/${comment.user_id}`}>@{comment.author.username}</StyledLink>
                <Typography sx={{color: "text.secondary", fontSize: "14px"}} component="span"> {formatDateAndTime(new Date(comment.created_at))}</Typography>
                {isEditing ? 
                <>
                    <CommentEditor
                        comment={comment}
                        setComment={setComment}
                        setIsEditing={setIsEditing}
                    /> 
                </>
                :
                <>
                    <Typography component="span" sx={{color: "text.primary"}}>
                        <Markdown>
                            {formatMarkdownWithLineBreaks(comment.body)}
                        </Markdown>
                    </Typography>
                    {isReplying ? 
                    <ReplyCreator comment={comment} setReplies={setReplies} setIsReplying={setIsReplying}/>
                    : 
                    <Box>
                        <Button onClick={() => {setIsReplying(true)}}>{!isUserSignedIn ? "Sign in to " : ""}Reply</Button>
                        {rating.is_visible ? <Typography component="span" color={getRatingColour(rating.score)} sx={{fontSize: "14px"}}>Rating: {rating.score}</Typography> : null}
                    </Box>}
                    {isReplying ? (rating.is_visible ? <Typography component="span" color={getRatingColour(rating.score)} sx={{fontSize: "14px"}}>Rating: {rating.score}</Typography> : null) : null}
                </>}
                {replyCount !== 0 ? <RepliesList comment_id={comment.comment_id} replies={replies} setReplies={setReplies} ratingVisibilityUpdated={ratingVisibilityUpdated}/> : null}
            </>}
        />
        {signedInUser.user_id === comment.user_id && !isEditing && !isReplying ? <>
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