import { Box, Button, FormControl, Grid2, Input, Slider, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { postComment } from "../../../api";
import Loading from "../Loading";
import wait from "../../utils/wait";
import RatingSlider from "./RatingSlider";

function CommentCreator({contentType, content_id, setComments}){
    const [body, setBody] = useState("");
    const {signedInUser} = useContext(UserContext)
    
    const [isRating, setIsRating] = useState(false);

    const [rating, setRating] = useState(null);
    const {isUserSignedIn} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    function handleSubmit(){
        setIsLoading(true);
        const data = {body, user_id: signedInUser.user_id}
        if(isRating){
            data.rating = rating;
        }
        postComment(contentType, content_id, data).then((comment) => {
            setComments((previousComments) => {
                const newComments = [...previousComments]
                newComments.unshift(comment);
                return newComments;
            })
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
                minWidth: "30vw",
                backgroundColor: isUserSignedIn ? null : "lightgray"
            }}
            minRows={5}
            multiline
            label={isUserSignedIn ? "Leave a comment" : "Sign in to leave a comment"}
            value={body}
            onChange={(event) => {setBody(event.target.value)}}
            disabled={!isUserSignedIn}
        />
        {isUserSignedIn ? <div>
            <Button id="rating-slider" onClick={() => {setIsRating((setRating) => {return !setRating})}}>Click here to rate this song from 1 to 10</Button>
            {isRating ? <RatingSlider rating={rating} setRating={setRating}/> : null}
        </div> : null
        }
        <br/>
        <Button disabled={!isUserSignedIn} variant="contained" onClick={handleSubmit}>Submit</Button>
        {error ? <p>{error}</p> : null}
    </FormControl>)
}

export default CommentCreator