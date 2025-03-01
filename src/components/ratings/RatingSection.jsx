import { useEffect, useState } from "react";
import { getAlbumById, getSongById } from "../../../api";
import { useParams } from "react-router-dom";
import RatingSetter from "./RatingSetter";
import wait from "../../utils/wait";
import { Typography } from "@mui/material";
import getRatingColour from "../../utils/get-rating-colour";
import Loading from "../Loading";

function RatingSection({contentType, setRatingVisibilityUpdated}){
    const params = useParams();
    const [averageRating, setAverageRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentRating, setCurrentRating] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const getContent = contentType === "song" ? getSongById(params[`${contentType}_id`]) : getAlbumById(params[`${contentType}_id`])
        getContent.then(({average_rating}) => {
            setAverageRating(average_rating);
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
        {averageRating ? <Typography color={getRatingColour(averageRating)} sx={{fontSize: "14px"}}>Average rating: {averageRating}</Typography> : null}
        <RatingSetter setRatingVisibilityUpdated={setRatingVisibilityUpdated} contentType={contentType} currentRating={currentRating} setCurrentRating={setCurrentRating}/>
        {error ? <p>{error}</p> : null}
    </>)
}

export default RatingSection