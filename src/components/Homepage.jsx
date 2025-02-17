import { useEffect, useState } from "react";
import { getAllSongs } from "../../api";
import SongCard from "./songs/SongCard";

function Homepage(){
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getAllSongs().then((songs) => {
            setIsLoading(false);
            setSongs(songs);
        }).catch((err) => {
            setIsLoading(false);
            setError(err);
        })
    }, [])

    if(isLoading){
        return <p>Now Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<>
        {songs.map((song) => {
            return <SongCard song={song}/>
        })}
    </>)
}

export default Homepage