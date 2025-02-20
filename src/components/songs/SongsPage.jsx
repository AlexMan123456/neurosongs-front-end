import { useEffect, useState } from "react";
import { getSongs } from "../../../api";
import SongCard from "./SongCard";
import { CircularProgress } from "@mui/material";
import Loading from "../Loading";

function SongsPage(){
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getSongs().then((songs) => {
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

    return (<section>
        <h2>Most recent songs</h2>
        <ul>
            {songs.map((song) => {
                return <SongCard key={`song-card-${song.song_id}`} song={song}/>
            })}
        </ul>
    </section>)
}

export default SongsPage