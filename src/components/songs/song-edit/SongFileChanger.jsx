import { deleteObject, getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useEffect, useState } from "react"
import { storage } from "../../../firebase-config";
import getSongDirectory from "../../../references/get-song-directory";
import Loading from "../../Loading";
import { Typography } from "@mui/material";
import H5AudioPlayer from "react-h5-audio-player";
import FileInput from "../../styling/FileInput";
import wait from "../../../utils/wait";
import turnFileIntoBase64URL from "../../../utils/turn-file-into-base-64-url";

function SongFileChanger({user_id, album_id, file, setFile, isFileChanged, setIsFileChanged}){
    const [audio, setAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        if(file?.name){
            const fileRef = ref(storage, getSongDirectory({user_id, album_id, reference: file.name}));
            getDownloadURL(fileRef).then((songURL) => {
                setAudio(songURL);
                setIsLoading(false);
            }).catch((err) => {
                if(!isFileChanged){
                    setError("Could not fetch existing song file. Please try again later.")
                }
                setIsLoading(false);
            })
        }
    }, [])

    function handleAudioChange(file){
        setIsLoading(true);
        return turnFileIntoBase64URL(file).then((songURL) => {
            setAudio(songURL);
            setFile(file);
            setIsFileChanged(true);
            setIsLoading(false);
        }).catch((err) => {
            setError("Error posting new song file. Please try again later.")
            setIsLoading(false);
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Typography color="error">{error}</Typography>
    }

    return (
        <>
            <H5AudioPlayer src={audio} showSkipControls={false} showJumpControls={false}/>
            <FileInput onChange={handleAudioChange} accept="audio/*">Upload audio</FileInput>
        </>
    )
}

export default SongFileChanger