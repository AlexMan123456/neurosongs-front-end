import { useEffect, useState } from "react"
import { getSongById } from "../../../api";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import StyledLink from "../styling/StyledLink";
import H5AudioPlayer from "react-h5-audio-player";

function AlbumSongCard({song}){
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    function handleClick(event){
        event.preventDefault();
        searchParams.set("song_id", song.song_id);
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }

    return (<li>
        <fieldset>
            <legend><button onClick={handleClick} style={{backgroundColor: "transparent", border: "none"}}>{song.title}</button> - {song.artist.artist_name}</legend>
        </fieldset>
    </li>)
}

export default AlbumSongCard