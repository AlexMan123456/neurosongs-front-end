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

    function handleSubmit(){
        setIsLoading(true);
        postReply(comment.comment_id, {
            user_id: signedInUser.user_id,
            body: reply
        }).then((reply) => {
            setReplies((replies) => {
                const newReplies = [...replies];
                newReplies.unshift(reply);
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