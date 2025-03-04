import { Box, Button, FormControl, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { postComment, postNotification } from "../../../api";
import Loading from "../Loading";
import wait from "../../utils/wait";
import RatingSlider from "../ratings/RatingSlider";

function CommentCreator({contentType, content_id, content_user_id, title, setComments}){
    const [body, setBody] = useState("");
    const {signedInUser, isUserSignedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    function handleSubmit(){
        setIsLoading(true);
        const data = {body, user_id: signedInUser.user_id}
        postComment(contentType, content_id, data).then((comment) => {
            const promises = [comment];
            if(signedInUser.user_id !== content_user_id){
                const splitComment = comment.body.split(0,50)
                promises.push(
                    postNotification({
                        sender_id: signedInUser.user_id,
                        receiver_id: content_user_id,
                        comment_id: comment.comment_id,
                        message: `New comment from ${signedInUser.artist_name} (@${signedInUser.username}) on ${title}:
                            
                        ${splitComment}${splitComment.length > 50 ? "..." : ""}`
                    })
                )
            }
            return Promise.all(promises)
        })
        .then(([comment, temp]) => {
            setComments((previousComments) => {
                const newComments = [...previousComments]
                newComments.unshift(comment);
                return newComments;
            })
            setBody("");
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error posting comment. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (<FormControl>
        <TextField
            sx={{
                width: "98vw",
                backgroundColor: isUserSignedIn ? null : "lightgray"
            }}
            minRows={5}
            multiline
            label={isUserSignedIn ? "Leave a comment" : "Sign in to leave a comment"}
            value={body}
            onChange={(event) => {setBody(event.target.value)}}
            disabled={!isUserSignedIn}
        />
        {isUserSignedIn ? <Box sx={{
                display: "grid",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
        </Box> : null
        }
        <br/>
        <Button disabled={!isUserSignedIn} variant="contained" onClick={handleSubmit}>Submit</Button>
        {error ? <p>{error}</p> : null}
    </FormControl>)
}

export default CommentCreator