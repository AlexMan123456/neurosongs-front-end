import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSongs } from "../../../api";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading";
import DisplaySongs from "../songs/DisplaySongs";
import StyledLink from "../styling/StyledLink";

function UserSongs(){
    const {signedInUser} = useContext(UserContext);
    const {user_id} = useParams()
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 495 && window.innerHeight > 800);

    useEffect(() => {
        setIsLoading(true);
        getSongs({user_id}, signedInUser.user_id).then((songs) => {
            setIsLoading(false);
            setSongs(songs);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch songs. Please try again later.");
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<Box>
        {signedInUser.user_id === user_id ? <StyledLink to={`/users/${user_id}/songs/create`}>Add a new song</StyledLink> : null}
        <DisplaySongs songs={songs} setSongs={setSongs}/>
    </Box>)
}

export default UserSongs