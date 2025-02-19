import { useEffect, useState } from "react";
import { getSongById } from "../../../api";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import 'react-h5-audio-player/lib/styles.css';
import H5AudioPlayer from "react-h5-audio-player";
import StyledLink from "../styling/StyledLink";

function SongPlayer(){
    const {song_id} = useParams()
    const [song, setSong] = useState(null);
    const [songData, setSongData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getSongById(song_id).then((songData) => {
            setSongData(songData)
            const songRef = ref(storage, `${songData.username}/${songData.album_id}/${songData.reference}`);
            return getDownloadURL(songRef);
        }).then((songURL) => {
            setIsLoading(false);
            setSong(songURL);
        })
        .catch((err) => {
            setError("Error fetching data. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <p>Now Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{songData.title}</h2>
        <StyledLink to={`/users/${songData.username}`}>{songData.artist.artist_name}</StyledLink>
        <H5AudioPlayer src={song}/>
    </section>)
}

export default SongPlayer