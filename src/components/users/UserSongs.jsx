import { useContext, useEffect, useState } from "react";
import { getSongs } from "../../../api";
import SongCard from "../songs/SongCard";
import Loading from "../Loading";
import { List } from "@mui/material";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";
import SongsTable from "../songs/SongsTable";
import SongsList from "../songs/SongsList";

function UserSongs(){
    const {signedInUser} = useContext(UserContext);
    const {user_id} = useParams()
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 495 && window.innerHeight > 800);

    useEffect(() => {
        setIsLoading(true);
        getSongs({user_id}).then((songs) => {
            setIsLoading(false);
            setSongs(songs);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch songs. Please try again later.");
        })
    }, [])

    useEffect(() => {
        function handleResize(){
            setIsLargeScreen(window.innerWidth > 495 && window.innerHeight > 800);
        }

        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize)}
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<List style={{listStyle: "none"}}>
        {signedInUser.user_id === user_id ? <StyledLink to={`/users/${user_id}/songs/create`}>Add a new song</StyledLink> : null}
        {
            // Do a media query here to decide if we render a list or a table
        }
        {isLargeScreen ? <SongsTable songs={songs} setSongs={setSongs}/> : <SongsList songs={songs} setSongs={setSongs}/>}
        
    </List>)
}

export default UserSongs