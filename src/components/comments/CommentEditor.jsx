import { Button, TextField } from "@mui/material"
import { useState } from "react"
import RatingSlider from "../ratings/RatingSlider";
import { patchComment } from "../../../api";
import Loading from "../Loading";

function CommentEditor({comment, setComment, setIsEditing}){
    const [body, setBody] = useState(comment.body);
    const [rating, setRating] = useState(comment.rating);
    const [editRating, setEditRating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleEdit(){
        setIsLoading(true);
        patchComment(comment.comment_id, {
            body, 
            //rating
        }).then((comment) => {
            setIsLoading(false);
            setIsEditing(false);
            setComment(comment);
        }).catch((err) => {
            setIsLoading(false);
            setIsEditing(false);
            setError("Error editing comment. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (<>
        <TextField
            sx={{
                minWidth: "30vw"
            }}
            value={body}
            onChange={(event) => {setBody(event.target.value)}}
            disabled={error ? true : false}
            />
        {error ? <p>{error}</p> : null}
        <br/>
        <Button disabled={error ? true : false} variant="contained" onClick={handleEdit}>Confirm</Button>
        {/*<Button disabled={error ? true : false} onClick={() => {setEditRating((editRating) => {return !editRating})}}>Edit rating</Button>*/}
        <Button disabled={error ? true : false} color="error" onClick={() => {setIsEditing(false)}}>Cancel</Button>
        {/*editRating ? <RatingSlider rating={rating} setRating={setRating}/> : null*/}
    </>)
}

export default CommentEditor