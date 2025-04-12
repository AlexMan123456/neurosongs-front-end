import { useContext, useEffect, useState } from "react"
import { getAlbumById, getSongById, patchSong } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import wait from "../../../utils/wait";
import Loading from "../../Loading";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import SongAudioInput from "../song-creation/SongAudioInput";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import getSongDirectory from "../../../references/get-song-directory";
import { storage } from "../../../firebase-config";
import { UserContext } from "../../../contexts/UserContext";
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import SongFileChanger from "./SongFileChanger";
import VisibilityOptions from "#components/utility/VisibilityOptions";

function SongEditPage(){
    const [userID, setUserID] = useState("");
    const [albumID, setAlbumID] = useState("");
    
    const [oldFileName, setOldFileName] = useState({});
    const [newFile, setNewFile] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isFileChanged, setIsFileChanged] = useState(false);
    const [visibility, setVisibility] = useState("");
    const [albumVisibility, setAlbumVisibility] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const {song_id} = useParams();
    const {signedInUser} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        getSongById(song_id, signedInUser.user_id).then((song) => {
            setUserID(song.user_id);
            setAlbumID(song.album_id);

            setTitle(song.title);
            setDescription(song.description ?? "");
            setOldFileName(song.reference);
            setNewFile({name: song.reference});
            setVisibility(song.visibility);
            return getAlbumById(song.album_id, signedInUser.user_id)
        }).then(({visibility}) => {
            setAlbumVisibility(visibility);
            setIsLoading(false);
        })
        .catch((err) => {
            setError("Error fetching album data. Please try again later");
            setIsLoading(false);
            wait(4).then(() => {
                setError("");
            })
        })
    }, [])

    async function handleSubmit(){
        setIsLoading(true);
        try {
            const data = {title, description, visibility}
            if(isFileChanged){
                const oldSongRef = ref(storage, getSongDirectory({user_id: userID, album_id: albumID, reference: oldFileName}));
                await deleteObject(oldSongRef);
                const newSongRef = ref(storage, getSongDirectory({user_id: userID, album_id: albumID, reference: newFile.name}));
                await uploadBytes(newSongRef, newFile);
                data.reference = newFile.name
            }
            await patchSong(song_id, data);
            setIsLoading(false);
            navigate(`/songs/${song_id}`);
        } catch (err) {
            setError("Error editing song details. Please try again later");
            await wait(4);
            setError("");
        }
    }

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== userID){
        return <ForbiddenAccess/>
    }

    return (<FormControl>
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
            <br/>
            <SongFileChanger
                user_id={userID}
                album_id={albumID}
                file={newFile}
                setFile={setNewFile}
                isFileChanged={isFileChanged}
                setIsFileChanged={setIsFileChanged}
            />
            <br/>
            <VisibilityOptions visibility={visibility} setVisibility={setVisibility} albumVisibility={albumVisibility}/>
        </Stack>
        <br/>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        {error ? <p>{error}</p> : null}
    </FormControl>)
}

export default SongEditPage