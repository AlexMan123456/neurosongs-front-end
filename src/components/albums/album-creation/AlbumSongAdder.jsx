// SCRAPPED FOR NOW: See AlbumSongAdderPage.jsx for more details.

import { FormControl, ListItem, TextField, Typography } from "@mui/material"
import FileInput from "../../styling/FileInput"
import { useState } from "react"
import Loading from "../../Loading";
import H5AudioPlayer from "react-h5-audio-player";
import wait from "../../../utils/wait";

function AlbumSongAdder({index, song, onTitleChange, onDescriptionChange}){
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [songAudio, setSongAudio] = useState(null);

    function handleAudioInput(file){
        setIsLoading(true);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (err) => {
                reject(err);
            }
        }).then((audioURL) => {
            song.reference = file;
            setSongAudio(audioURL);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error fetching audio file. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<ListItem>
        <Typography>{index+1}. </Typography>
        <FormControl>
            <TextField
                required
                label="Title"
                value={song.title}
                onChange={onTitleChange}
            />
            <TextField
                multiline
                sx={{
                    minWidth: "30vw",
                }}
                minRows={5}
                label="Description"
                value={song.description}
                onChange={onDescriptionChange}
            />
            {songAudio ? <H5AudioPlayer src={songAudio}/> : null}
            <FileInput
                accept="audio/*"
                onChange={handleAudioInput}
            >
                Upload audio
            </FileInput>
        </FormControl>
    </ListItem>)
}

export default AlbumSongAdder