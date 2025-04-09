// The ability to set album covers is here, but still a work in progress, so you won't be able to do so in the final version.
// It relies on the PATCH /api/albums/:album_id endpoint, which is not yet complete.

import { Button, FormControl } from "@mui/material";
import FileInput from "../../styling/FileInput";
import AlbumCoverInput from "./AlbumCoverInput";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { getAlbumById, patchAlbum } from "../../../../api";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import getAlbumCoverDirectory from "../../../references/get-album-cover-directory";
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import Loading from "../../Loading";
import wait from "../../../utils/wait";

function AlbumCoverEditor(){
    const {user_id, album_id} = useParams();
    const [album, setAlbum] = useState({});
    const [frontCoverFile, setFrontCoverFile] = useState(null);
    const [backCoverFile, setBackCoverFile] = useState(null);
    const {signedInUser} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(album_id, signedInUser.user_id).then((album) => {
            setIsLoading(false);
            setAlbum(album);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error loading album data. Please try again later.")
            return wait(4).then(() => {
                setError("")
            })
        })

    }, [])

    async function handleSubmit(){
        try {
            setIsLoading(true);
            
            const data = {}
            if(frontCoverFile !== null){
                const frontCoverRef = ref(storage, getAlbumCoverDirectory({user_id, album_id, front_cover_reference: frontCoverFile.name}, "front"));
                await uploadBytes(frontCoverRef, frontCoverFile);
                data.front_cover_reference = frontCoverFile.name;
            }
    
            if(backCoverFile !== null){
                const backCoverRef = ref(storage, getAlbumCoverDirectory({user_id, album_id, back_cover_reference: backCoverFile.name}, "back"));
                await uploadBytes(backCoverRef, backCoverFile);
                data.back_cover_reference = backCoverFile.name;
            }

            if(Object.keys(data).length !== 0){
                await patchAlbum(album_id, data)
            }
            navigate(`/users/${user_id}`)
        } catch(err) {
            setError("Error setting album covers. Please try again later.")
            await wait(4);
            setError("");
        }


    }

    if(signedInUser.user_id !== user_id){
        return <ForbiddenAccess/>
    }

    if(isLoading){
        return <Loading/>
    }

    return (<>
        <h3>Set the album covers for your album, {album.title} (this is optional)</h3>
        <FormControl>
            <AlbumCoverInput
                setCover={setFrontCoverFile}
                side="front"
            />
            <AlbumCoverInput 
                setCover={setBackCoverFile}
                side="back"
            />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        {error ? <p>{error}</p> : null}
        </FormControl>
    </>)

}

export default AlbumCoverEditor