import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react"
import { storage } from "../../../firebase-config";
import getSongDirectory from "../../../references/get-song-directory";
import Loading from "../../Loading";
import { Box } from "@mui/material";
import FileInput from "../../styling/FileInput";
import turnFileIntoBase64URL from "../../../utils/turn-file-into-base-64-url";
import H5AudioPlayer from "react-h5-audio-player";

function SongAudioInput({user_id, album_id, reference, setFile}){
    const [audio, setAudio] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(reference){
            setIsLoading(true);
            const songRef = ref(storage, getSongDirectory({user_id, album_id, reference}));
            getDownloadURL(songRef).then((songURL) => {
                setAudio(songURL);
                setIsLoading(false);
            }).catch((err) => {
                setError("Error fetching existing song audio. Please try again later.")
                return wait(4).then(() => {
                    setError("");
                })
            })
        }
    }, [])

    function handleAudioInput(file){
        return turnFileIntoBase64URL(file).then((songURL) => {
            setAudio(songURL);
            setFile(file);
            setIsLoading(false);
        }).catch((err) => {
            setError("Error setting new audio. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (<Box>
        {audio ? <H5AudioPlayer src={audio} showJumpControls={false}/> : null}
        <FileInput
            accept="audio/*"
            onChange={handleAudioInput}
        >
            Upload audio
        </FileInput>
        {error ? <p>{error}</p> : null}
    </Box>)
}

export default SongAudioInput