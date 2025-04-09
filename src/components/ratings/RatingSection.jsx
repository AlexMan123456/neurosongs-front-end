import { useContext, useEffect, useState } from "react";
import { getAlbumById, getSongById } from "../../../api";
import { useParams } from "react-router-dom";
import RatingSetter from "./RatingSetter";
import wait from "../../utils/wait";
import { Typography } from "@mui/material";
import getRatingColour from "../../utils/get-rating-colour";
import Loading from "../Loading";
import { UserContext } from "#contexts/UserContext";

function RatingSection({contentType, setRatingVisibilityUpdated}){
    const params = useParams();
    const [averageRating, setAverageRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentRating, setCurrentRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true);
        const getContent = contentType === "song" ? getSongById(params[`${contentType}_id`]) : getAlbumById(params[`${contentType}_id`], signedInUser.user_id)
        getContent.then(({average_rating, rating_count}) => {
            setAverageRating(average_rating);
            setRatingCount(rating_count);
            setIsLoading(false);
        }).catch((err) => {
            setError("Error getting average rating.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }, [currentRating])

    if(isLoading){
        return <Loading/>
    }

    return (<>
        {ratingCount !== 0 ? <>
            <Typography color={getRatingColour(averageRating)} sx={{fontSize: "14px"}}>Average rating: {averageRating} </Typography>
            <Typography sx={{fontSize: "14px"}}>Based on {ratingCount} rating{ratingCount === 1 ? "" : "s"}</Typography>
        </>: null}
        <RatingSetter setRatingVisibilityUpdated={setRatingVisibilityUpdated} contentType={contentType} currentRating={currentRating} setCurrentRating={setCurrentRating}/>
        {error ? <p>{error}</p> : null}
    </>)
}

export default RatingSection