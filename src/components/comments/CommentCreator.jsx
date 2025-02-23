import { Button, FormControl, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

function CommentCreator({content}){
    const [comment, setComment] = useState("");
    const {isUserSignedIn} = useContext(UserContext)

    function handleSubmit(){

    }

    return (<FormControl>
        <TextField
            sx={{
                minWidth: "30vw",
                backgroundColor: isUserSignedIn ? null : "lightgray"
            }}
            minRows={5}
            multiline
            label={isUserSignedIn ? "Leave a comment" : "Sign in to leave a comment"}
            value={comment}
            onChange={(event) => {setComment(event.target.value)}}
            disabled={!isUserSignedIn}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </FormControl>)
}

export default CommentCreator