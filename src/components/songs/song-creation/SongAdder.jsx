import { useContext, useEffect, useState } from "react"
import { getAlbumById, postSong } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import getAlbumCoverDirectory from "../../../references/get-album-cover-directory";
import Loading from "../../Loading";
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import StyledImage from "../../styling/StyledImage";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import H5AudioPlayer from "react-h5-audio-player";
import FileInput from "../../styling/FileInput";
import wait from "../../../utils/wait";
import getSongDirectory from "../../../references/get-song-directory";
import VisibilityOptions from "#components/utility/VisibilityOptions";

function SongAdder(){
    const {album_id} = useParams();
    const {signedInUser} = useContext(UserContext);
    const [album, setAlbum] = useState({});
    const [frontCover, setFrontCover] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("");

    const [songAudio, setSongAudio] = useState(null);
    const [songFile, setSongFile] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(album_id, signedInUser.user_id).then((album) => {
            setAlbum(album);
            setVisibility(album.visibility);
            const frontCoverRef = ref(storage, getAlbumCoverDirectory(album, "front"));
            return getDownloadURL(frontCoverRef)
        }).then((frontCoverURL) => {
            setIsLoading(false);
            setFrontCover(frontCoverURL);
        })
        .catch((err) => {
            setIsLoading(false);
            setError("Error fetching album data. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }, [])

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
            setSongFile(file);
            setSongAudio(audioURL);
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error fetching audio file. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    function handleSubmit(){
        setIsLoading(true);

        if(!songFile){
            return Promise.reject().catch((err) => {
                setIsLoading(false);
                setError("ERROR: Please provide an audio file.");
                wait(4).then(() => {
                    setError("");
                })
            })
        }

        if(!title){
            return Promise.reject().catch((err) => {
                setIsLoading(false);
                setError("ERROR: Please enter a song title.");
                wait(4).then(() => {
                    setError("");
                })
            })
        }

        const data = {
            user_id: album.user_id,
            title,
            reference: songFile.name,
            visibility
        }

        if(description){
            data.description = description;
        }

        const songRef = ref(storage, getSongDirectory({...data, album_id: album.album_id}));
        return uploadBytes(songRef, songFile).then(() => {
            return postSong(album.album_id, data)
        }).then((song) => {
            return Promise.all([song, wait(2)]);
        }).then(([song, temp]) => {
            setIsLoading(false);
            navigate(`/songs/${song.song_id}`);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error posting song. Please try again later.");
            wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== album.user_id){
        return <ForbiddenAccess/>
    }

    return (<section>
        <h2>Add a song to {album.title}</h2>
        <StyledImage src={frontCover} alt={`${album.title}'s front cover`}/>
        <br/>
        <br/>
        <FormControl>
            <Stack spacing={1}>
                <TextField
                    required
                    label="Title"
                    value={title}
                    onChange={(event) => {setTitle(event.target.value)}}
                />
                <TextField
                    multiline
                    sx={{
                        minWidth: "30vw",
                    }}
                    minRows={5}
                    label="Description"
                    value={description}
                    onChange={(event) => {setDescription(event.target.value)}}
                />
                {songAudio ? <H5AudioPlayer src={songAudio}/> : null}
                {<FileInput
                    accept="audio/*"
                    onChange={handleAudioInput}
                >
                    Upload audio
                </FileInput>}
                <VisibilityOptions visibility={visibility} setVisibility={setVisibility} width="125px" albumVisibility={album.visibility}/>
                {error ? <p>{error}</p> : null}
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Stack>
        </FormControl>
        </section>)
}

export default SongAdder