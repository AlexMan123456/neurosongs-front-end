import { useEffect, useState } from "react";
import StyledLink from "../styling/StyledLink"
import H5AudioPlayer from "react-h5-audio-player";
import { getSongById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { useLocation } from "react-router-dom";

function SongCard({song}){
    const [showSongPlayer, setShowSongPlayer] = useState(false);
    const [songURL, setSongURL] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        getSongById(song.song_id).then((songData) => {
            const songRef = ref(storage, `${songData.username}/${songData.album_id}/${songData.reference}`)
            return getDownloadURL(songRef)
        }).then((songURL) => {
            setIsLoading(false);
            setSongURL(songURL)
        }).catch((err) => {
            setError("Error getting song to play. Please try again later.")
        })
    }, [])

    function handleClick(event){
        event.preventDefault();
        setShowSongPlayer((showSongPlayer) => {
            return !showSongPlayer
        })
    }

    return (<fieldset>
        <li>
            <StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>
            {location.pathname.includes("users") ? <p>{song.artist.artist_name}</p> : <StyledLink to={`/users/${song.username}`}><p>{song.artist.artist_name}</p></StyledLink>}
            <button onClick={handleClick}>Show song player</button>
            {showSongPlayer 
            ?
            <>
                <H5AudioPlayer src={songURL}/>
            </>
            : null}
        </li>
    </fieldset>)
}

export default SongCard