import { useContext, useEffect, useState } from "react"
import RatingSlider from "./RatingSlider"
import { Box, Button, Checkbox, FormControl, FormControlLabel, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { deleteRating, getRatingByIds, patchRating, postRating } from "../../../api";
import getRatingColour from "../../utils/get-rating-colour";
import { UserContext } from "../../contexts/UserContext";

function RatingSetter({contentType, currentRating, setCurrentRating, setRatingVisibilityUpdated}){
    const params = useParams();
    const {signedInUser, isUserSignedIn} = useContext(UserContext);
    const [newRating, setNewRating] = useState(0);
    const [showRatingSlider, setShowRatingSlider] = useState(false);
    const [newIsVisible, setNewIsVisible] = useState(false);
    const [currentIsVisible, setCurrentIsVisible] = useState(false);

    useEffect(() => {
        getRatingByIds(contentType + "s", signedInUser.user_id, params[`${contentType}_id`]).then((rating) => {
            if(Object.keys(rating).length !== 0){
                setCurrentRating(rating.score);
                setCurrentIsVisible(rating.is_visible);
                setNewIsVisible(rating.is_visible);
                setNewRating(rating.score);
            }
        })
    }, [])

    function handleSubmit(){
        const callAPI = currentRating === 0 ? postRating(contentType + "s", params[`${contentType}_id`], {
            user_id: signedInUser.user_id,
            score: newRating,
            is_visible: newIsVisible
        }) : patchRating(contentType + "s", signedInUser.user_id, params[`${contentType}_id`], {
            score: newRating,
            is_visible: newIsVisible
        })
        
        callAPI.then((rating) => {
            setCurrentRating(rating.score);
            setCurrentIsVisible(rating.is_visible);
            setShowRatingSlider(false);
            if(currentIsVisible !== newIsVisible){
                setRatingVisibilityUpdated((oldValue) => {
                    return !oldValue;
                })
            }
        })
    }

    function handleClear(){
        deleteRating(contentType + "s", signedInUser.user_id, params[`${contentType}_id`]).then(() => {
            setCurrentRating(0);
            setNewRating(0);
            setShowRatingSlider(false);
            setRatingVisibilityUpdated((oldValue) => {
                return !oldValue;
            })
        })
    }

    return (
        <Box sx={{
            display: "grid",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Button id="rating-slider" disabled={!isUserSignedIn} onClick={() => {setShowRatingSlider((setRating) => {return !setRating})}}>
                {showRatingSlider ? "Close Rating Controls" : (`${!isUserSignedIn ? "Sign in to " : ""} rate this ${contentType} from 1 to 10`)}
            </Button>
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
                                checked={newIsVisible}
                                onChange={() => {setNewIsVisible((isVisible) => {return !isVisible})}}
                            />
                        } 
                        label="Make my rating visible in comments"/>
                    {currentRating > 0 ? <Button onClick={handleClear}>Clear Rating</Button> : null}
                    {currentRating > 0 ? <Button onClick={() => {setNewRating(currentRating)}}>Reset Rating</Button> : null}
                    <Button onClick={handleSubmit} variant="contained">Submit Rating</Button>
                </FormControl>
            : null}
        </Box>
    )
}

export default RatingSetter