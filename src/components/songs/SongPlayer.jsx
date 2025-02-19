import { useEffect, useState } from "react";
import { getSong } from "../../../api";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import 'react-h5-audio-player/lib/styles.css';
import H5AudioPlayer from "react-h5-audio-player";

function SongPlayer(){
    const {song_id} = useParams()
    const [song, setSong] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getSong(song_id).then((songData) => {
            setIsLoading(false);
            const songRef = ref(storage, `${songData.username}/${songData.album_id}/${songData.reference}`);
            return getDownloadURL(songRef);
        }).then((songURL) => {
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

    return <H5AudioPlayer src={song}/>
}

export default SongPlayer