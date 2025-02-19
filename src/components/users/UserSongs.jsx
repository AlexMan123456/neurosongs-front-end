import { useEffect, useState } from "react"
import { getSongsFromUser } from "../../../api"
import SongCard from "../songs/SongCard";

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
        return <p>Now Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<ul>
        {songs.map((song) => {
            return (<li key={`song-list-element-${song.song_id}`}>
                <SongCard key={`song-card-${song.song_id}`} song={song}/>
            </li>)
        })}
    </ul>)
}

export default UserSongs