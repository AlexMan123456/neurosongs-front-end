import { useEffect, useState } from "react";
import StyledLink from "../styling/StyledLink"
import H5AudioPlayer from "react-h5-audio-player";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { ListItemButton, ListItemText } from "@mui/material";

function SongCard({song}){
    const [showSongPlayer, setShowSongPlayer] = useState(false);
    const [songURL, setSongURL] = useState(null);
    const [error, setError] = useState("")

    useEffect(() => {
        const songRef = ref(storage, `${song.user_id}/albums/${song.album_id}/songs/${song.reference}`)
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

    return (<>
        <ListItemButton
            alignItems="center"
            sx={{ border: 0.5, borderRadius: 0.7 }}
            onClick={handleClick}
        >
            <ListItemText>
                <StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>
            </ListItemText>
            <ListItemText>{song.artist.artist_name}</ListItemText>
            {!location.pathname.includes("users") ?
            <ListItemText>
                <StyledLink to={`/users/${song.user_id}`}>@{song.artist.username}</StyledLink>
            </ListItemText>
            : null
            }
        </ListItemButton>
        {showSongPlayer
        ?
        <>
            <H5AudioPlayer src={songURL}/>
        </>
        : null}
    </>)
}

export default SongCard