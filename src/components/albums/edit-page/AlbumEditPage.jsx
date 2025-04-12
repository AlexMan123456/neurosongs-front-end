import { useContext, useEffect, useState } from "react"
import { getAlbumById, patchAlbum, patchSong } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading";
import { UserContext } from "../../../contexts/UserContext";
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import FileInput from "../../styling/FileInput";
import AlbumCoverInput from "../album-creation/AlbumCoverInput";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import getAlbumCoverDirectory from "../../../references/get-album-cover-directory";
import wait from "../../../utils/wait";
import ReorderSongs from "./ReorderSongs";
import VisibilityOptions from "#components/utility/VisibilityOptions";

function AlbumEditPage(){
    const {album_id} = useParams();
    const {signedInUser} = useContext(UserContext);
    const [album, setAlbum] = useState({});
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(album_id, signedInUser.user_id).then((album) => {
            setAlbum(album);
            setTitle(album.title);
            setDescription(album.description);
            setFrontCover(album.front_cover_reference);
            setBackCover(album.back_cover_reference);
            setSongs(album.songs);
            setVisibility(album.visibility)
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error fetching album. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }, [])

    async function handleSubmit(){
        try {
            setIsLoading(true);
            if(!title){
                setError("ERROR: Title cannot be blank. Please enter a title.");
                return;
            }
            
            const data = {title, visibility};
            
            if(description){
                data.description = description;
            }
            
            if(frontCover !== album.front_cover_reference){
                const frontCoverRef = ref(storage, getAlbumCoverDirectory({user_id: album.user_id, album_id, front_cover_reference: frontCover.name}, "front"));
                await uploadBytes(frontCoverRef, frontCover);
                data.front_cover_reference = frontCover.name;
            }
    
            if(backCover !== album.back_cover_reference){
                const backCoverRef = ref(storage, getAlbumCoverDirectory({user_id: album.user_id, album_id, back_cover_reference: backCover.name}, "back"))
                await uploadBytes(backCoverRef, backCover);
                data.back_cover_reference = backCover.name;
            }

            await patchAlbum(album_id, data);

            if(songs?.length !== 0){
                for(const song of songs){
                    await patchSong(song.song_id, {
                        index: song.index
                    })
                }
            }

            await wait(2);
            navigate(`/albums/${album_id}`);
        } catch(err) {
            setError("Error saving your edits. Please try again later.")
            await wait(4);
            setError("");
        }


    }

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== album.user_id){
        return <ForbiddenAccess/>
    }

    return (<FormControl>
        <Stack spacing={1}>
            <AlbumCoverInput
                side="front"
                setCover={setFrontCover}
            />
            <AlbumCoverInput
                side="back"
                setCover={setBackCover}
            />
            <TextField
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
            <VisibilityOptions visibility={visibility} setVisibility={setVisibility} width={"125px"}/>
        </Stack>
        {error ? <p>{error}</p> : null}
        <ReorderSongs songs={songs} setSongs={setSongs}/>
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>)
}

export default AlbumEditPage