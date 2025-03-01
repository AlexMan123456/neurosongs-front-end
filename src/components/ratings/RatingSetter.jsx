import { useState } from "react"
import RatingSlider from "./RatingSlider"
import { Box, Button, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import { postRating } from "../../../api";

function RatingSetter({contentType}){
    const params = useParams();
    const [currentRating, setCurrentRating] = useState(0)
    const [newRating, setNewRating] = useState(0);
    const [isRating, setIsRating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function handleSubmit(){
        postRating(params[`${contentType}_id`], contentType, {
            score: newRating,
            is_visible: isVisible
        }).then((rating) => {
            setCurrentRating(rating.score);
        })
    }

    return (
        <Box sx={{
            display: "grid",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Button id="rating-slider" onClick={() => {setIsRating((setRating) => {return !setRating})}}>Click here to rate this {contentType} from 1 to 10</Button>
            {isRating ? 
                <FormControl>
                    <RatingSlider rating={newRating} setRating={setNewRating} paddingLeft="23px"/>
                    <FormControlLabel
                        sx={{
                            paddingLeft: "30px"
                        }}
                        control={
                            <Checkbox
                                checked={isVisible}
                                onChange={() => {setIsVisible((isVisible) => {return !isVisible})}}
                            />
                        } 
                        label="Make my rating visible in comments"/>
                    <Button onClick={handleSubmit}>Submit Rating</Button>
                </FormControl>
            : null}
        </Box>
    )
}

export default RatingSetter