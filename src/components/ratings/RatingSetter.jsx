import { useContext, useEffect, useState } from "react"
import RatingSlider from "./RatingSlider"
import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { deleteRating, getRatingByIds, patchRating, postRating } from "../../../api";
import getRatingColour from "../../utils/get-rating-colour";
import { UserContext } from "../../contexts/UserContext";
import DeletePopup from "../utility/DeletePopup";

function RatingSetter({contentType, currentRating, setCurrentRating}){
    const params = useParams();
    const {signedInUser} = useContext(UserContext);
    const [newRating, setNewRating] = useState(0);
    const [showRatingSlider, setShowRatingSlider] = useState(false);
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
        const callAPI = currentRating === 0 ? postRating(contentType + "s", params[`${contentType}_id`], {
            user_id: signedInUser.user_id,
            score: newRating,
            is_visible: isVisible
        }) : patchRating(contentType + "s", signedInUser.user_id, params[`${contentType}_id`], {
            score: newRating,
            isVisible: isVisible
        })
        
        callAPI.then((rating) => {
            setCurrentRating(rating.score);
            setShowRatingSlider(false);
        })
    }

    function handleReset(){
        deleteRating(contentType + "s", signedInUser.user_id, params[`${contentType}_id`]).then(() => {
            setCurrentRating(0);
            setNewRating(0);
            setShowRatingSlider(false);
        })
    }

    return (
        <Box sx={{
            display: "grid",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Button id="rating-slider" onClick={() => {setShowRatingSlider((setRating) => {return !setRating})}}>Click here to rate this {contentType} from 1 to 10</Button>
            {currentRating !== 0 ? <Typography color={getRatingColour(currentRating)}>Your current rating: {currentRating}</Typography> : null}
            {showRatingSlider ? 
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
                    {currentRating > 0 ? <Button onClick={handleReset}>Reset Rating</Button> : null}
                    <Button onClick={handleSubmit} variant="contained">Submit Rating</Button>
                </FormControl>
            : null}
        </Box>
    )
}

export default RatingSetter