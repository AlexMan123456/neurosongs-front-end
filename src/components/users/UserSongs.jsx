import { useEffect, useState } from "react";
import { getSongsFromUser } from "../../../api";
import SongCard from "../songs/SongCard";
import Loading from "../Loading";

function UserSongs(props){
    const {username} = props;
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getSongsFromUser(username).then((songs) => {
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

    return (<ul style={{listStyle: "none"}}>
        {songs.map((song) => {
            return <SongCard key={`song-card-${song.song_id}`} song={song}/>
        })}
    </ul>)
}

export default UserSongs