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
    const [error, setError] = useState("")

    useEffect(() => {
        const songRef = ref(storage, `${song.username}/${song.album_id}/${song.reference}`)
        getDownloadURL(songRef).then((songURL) => {
            setSongURL(songURL)
        }).catch((err) => {
            setError("Error fetching song. Please try again later.")
        })
    }, [])

    function handleClick(event){
        event.preventDefault();
        setShowSongPlayer((showSongPlayer) => {
            return !showSongPlayer
        })
    }

    if(error){
        return <p>{error}</p>
    }

    return (<li>
        <fieldset>
            <legend>
                {location.pathname.includes("users") ? <p>{song.artist.artist_name}</p> : <StyledLink to={`/users/${song.username}`}><p>{song.artist.artist_name}</p></StyledLink>}
            </legend>
                <StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>
                <button onClick={handleClick}>Show song player</button>
                {showSongPlayer 
                ?
                <>
                    <H5AudioPlayer src={songURL}/>
                </>
                : null}
        </fieldset>
    </li>)
}

export default SongCard