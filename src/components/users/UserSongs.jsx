import { useContext, useEffect, useState } from "react";
import { getSongs } from "../../../api";
import SongCard from "../songs/SongCard";
import Loading from "../Loading";
import { List } from "@mui/material";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import StyledLink from "../styling/StyledLink";

function UserSongs(){
    const {signedInUser} = useContext(UserContext);
    const {user_id} = useParams()
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

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

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<List style={{listStyle: "none"}}>
        {signedInUser.user_id === user_id ? <StyledLink to={`/users/${user_id}/songs/create`}>Add a new song</StyledLink> : null}
        {songs.map((song) => {
            return <SongCard key={`song-card-${song.song_id}`} song={song}/>
        })}
    </List>)
}

export default UserSongs