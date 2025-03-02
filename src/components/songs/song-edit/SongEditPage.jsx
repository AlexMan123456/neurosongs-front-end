import { useContext, useEffect, useState } from "react"
import { getSongById, patchSong } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import wait from "../../../utils/wait";
import Loading from "../../Loading";
import { Button, FormControl, TextField } from "@mui/material";
import SongAudioInput from "../song-creation/SongAudioInput";
import { ref, uploadBytes } from "firebase/storage";
import getSongDirectory from "../../../references/get-song-directory";
import { storage } from "../../../firebase-config";
import { UserContext } from "../../../contexts/UserContext";
import ForbiddenAccess from "../../errors/ForbiddenAccess";

function SongEditPage(){
    const [userID, setUserID] = useState("");
    const [albumID, setAlbumID] = useState("");
    
    const [file, setFile] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const {song_id} = useParams();
    const {signedInUser} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        getSongById(song_id).then((song) => {
            setUserID(song.user_id);
            setAlbumID(song.album_id);

            setTitle(song.title);
            setDescription(song.description ?? "");
            setFile({name: song.reference});

            setIsLoading(false);
        }).catch((err) => {
            setError("Error fetching album data. Please try again later");
            setIsLoading(false);
            return wait(4).then(() => {
                setError("");
            })
        })
    }, [])

    async function handleSubmit(){
        //const songRef = ref(storage, getSongDirectory({user_id: userID, album_id: albumID, reference: file.name}));
        setIsLoading(true);
        
        //return uploadBytes(songRef, file).then(() => {
            return patchSong(song_id, {
                title,
                description
                //reference: file.name
            }).then(() => {
                setIsLoading(false);
                navigate(`/songs/${song_id}`);
            }).catch((err) => {
                setError("Error editing song details. Please try again later");
                return wait(4).then(() => {
                    setError("");
                })
            })
        //})
    }

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== userID){
        return <ForbiddenAccess/>
    }

    return (<FormControl>
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
        {/*<br/>
        <SongAudioInput
            user_id={userID}
            album_id={albumID}
            reference={file.name}
            setFile={setFile}
        />}*/}
        <br/>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        {error ? <p>{error}</p> : null}
    </FormControl>)
}

export default SongEditPage