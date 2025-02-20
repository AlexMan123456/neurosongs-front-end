import { useEffect, useState } from "react"
import { getSongById } from "../../../api";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import StyledLink from "../styling/StyledLink";

function AlbumSongCard({song}){
    const [songURL, setSongURL] = useState({});
    const {album_id} = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const songRef = ref(storage, `${song.username}/${album_id}/${song.reference}`);
        getDownloadURL(songRef).then((songURL) => {
            setIsLoading(false);
            setSongURL(songURL);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error fetching song. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <p>Now Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<li>
        <fieldset>
            <legend><StyledLink to={`songs/${song.song_id}`}>{song.title}</StyledLink> - {song.artist.artist_name}</legend>
        </fieldset>
    </li>)
}

export default AlbumSongCard