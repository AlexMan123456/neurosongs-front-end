import { Box, Button, FormControl, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { postComment } from "../../../api";
import { UserContext } from "../../contexts/UserContext";
import wait from "../../utils/wait";
import Loading from "../Loading";
import { ScreenSizeContext } from "#contexts/ScreenSizeContext";

function CommentCreator({contentType, content_id, content_user_id, title, setComments}){
    const [body, setBody] = useState("");
    const {signedInUser, isUserSignedIn} = useContext(UserContext);
    const {isLargeScreen} = useContext(ScreenSizeContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    function handleSubmit(){
        setIsLoading(true);
        const data = {body, user_id: signedInUser.user_id}
        postComment(contentType, content_id, data).then((comment) => {
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
                width: isLargeScreen ? "90vw" : "98vw",
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