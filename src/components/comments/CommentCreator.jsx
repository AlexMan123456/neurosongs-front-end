import { Box, Button, FormControl, Grid2, Input, Slider, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

function CommentCreator({content}){
    const contentType = content.song_id ? "song" : "album";
    const [comment, setComment] = useState("");
    
    const [isRating, setIsRating] = useState(false);

    const [chosenRating, setChosenRating] = useState(1);
    const {isUserSignedIn} = useContext(UserContext);

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
        {isUserSignedIn ? <div>
            <Button id="rating-slider" onClick={() => {setIsRating((setRating) => {return !setRating})}}>Click here to rate this song from 1 to 10</Button>
            {isRating ? <Box>
                <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid2 item>
                        <Slider
                            id="rating-slider"
                            step={0.1}
                            min={1}
                            max={10}
                            value={chosenRating}
                            onChange={(event, newValue) => {setChosenRating(newValue)}}
                            valueLabelDisplay="auto"
                            color={chosenRating < 4.5 ? "error" : (chosenRating < 7 ? "warning" : "success")}
                            aria-labelledby="rating-slider"
                            sx={{width: 250}}
                        />
                    </Grid2>
                    <Grid2 item>
                        <Input
                            value={chosenRating}
                            onChange={(event) => {setChosenRating(event.target.valueAsNumber)}}
                            inputProps={{
                                step: 0.1,
                                min: 1,
                                max: 10,
                                type: 'number',
                                "aria-labelledby": "rating-slider"
                            }}
                        />
                    </Grid2>
                </Grid2>
            </Box> : null}
        </div> : null
        }
        <br/>
        <Button disabled={!isUserSignedIn} variant="contained" onClick={handleSubmit}>Submit</Button>
    </FormControl>)
}

export default CommentCreator