import { useEffect, useState } from "react";
import { getSongsFromUser } from "../../../api";
import SongCard from "../songs/SongCard";
import Loading from "../Loading";
import { List } from "@mui/material";

function UserSongs({user_id}){
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getSongsFromUser(user_id).then((songs) => {
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
        {songs.map((song) => {
            return <SongCard key={`song-card-${song.song_id}`} song={song}/>
        })}
    </List>)
}

export default UserSongs