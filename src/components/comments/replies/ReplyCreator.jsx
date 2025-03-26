import { Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { postNotification, postReply } from "../../../../api";
import { UserContext } from "../../../contexts/UserContext";
import wait from "../../../utils/wait";
import Loading from "../../Loading";

function ReplyCreator({comment, setIsReplying, setReplies}){
    const [reply, setReply] = useState("");
    const {signedInUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const contentType = comment.song_id ? "song" : "album"

    function handleSubmit(){
        setIsLoading(true);
        postReply(comment.comment_id, {
            user_id: signedInUser.user_id,
            body: reply
        }).then((reply) => {
            const splitReply = reply.body.split(0,50)
            const contentType = comment.song_id ? "song" : "album"
            return Promise.all([
                reply,
                postNotification({
                    sender_id: signedInUser.user_id,
                    receiver_id: comment.user_id,
                    comment_id: reply.comment_id,
                    message: `New reply to your comment on ${comment[contentType].title}: 
                    
                    ${splitReply}${splitReply.length > 50 ? "..." : ""}`
                })
            ])
        })
        .then(([reply, temp]) => {
            setReplies((replies) => {
                const newReplies = [...replies];
                newReplies.push(reply);
                return newReplies;
            })
            setIsLoading(false);
            setIsReplying(false);
        }).catch((err) => {
            setError("Could not post reply. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (
        <>
            <TextField
                multiline
                sx={{
                    minWidth: "30vw",
                }}
                minRows={5}
                value={reply}
                onChange={(event) => {setReply(event.target.value)}}
                disabled={!!error}
            />
            <Button color="error" onClick={() => {setIsReplying(false)}}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={!!error}>Submit</Button>
            {error ? <p>{error}</p> : null}
        </>
    )
}

export default ReplyCreator