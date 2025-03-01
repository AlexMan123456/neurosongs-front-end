import { useContext, useEffect, useState } from "react"
import RatingSlider from "./RatingSlider"
import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getRatingByIds, postRating } from "../../../api";
import getRatingColour from "../../utils/get-rating-colour";
import { UserContext } from "../../contexts/UserContext";

function RatingSetter({contentType}){
    const params = useParams();
    const {signedInUser} = useContext(UserContext);
    const [currentRating, setCurrentRating] = useState(0)
    const [newRating, setNewRating] = useState(0);
    const [isRating, setIsRating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        getRatingByIds(contentType + "s", signedInUser.user_id, params[`${contentType}_id`]).then((rating) => {
            if(Object.keys(rating).length !== 0){
                setCurrentRating(rating.score);
                setNewRating(rating.score);
            }
        })
    }, [])

    function handleSubmit(){
        postRating(contentType + "s", params[`${contentType}_id`], {
            user_id: signedInUser.user_id,
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
            {currentRating !== 0 ? <Typography color={getRatingColour(currentRating)}>Your current rating: {currentRating}</Typography> : null}
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