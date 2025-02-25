// The ability to set album covers is here, but still a work in progress, so you won't be able to do so in the final version.
// It relies on the PATCH /api/albums/:album_id endpoint, which is not yet complete.

import { Button, FormControl } from "@mui/material";
import FileInput from "../../styling/FileInput";
import AlbumCoverInput from "./AlbumCoverInput";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { getAlbumById } from "../../../../api";

function AlbumCoverEditor(){
    const {user_id, album_id} = useParams();
    const [album, setAlbum] = useState({});
    const [frontCoverFile, setFrontCoverFile] = useState("");
    const [backCoverFile, setBackCoverFile] = useState("");
    const {signedInUser} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(album_id).then((album) => {
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

    if(signedInUser.user_id !== user_id){
        <section>
            <h2>Wrong account!</h2>
            <p>Looks like you're on the wrong album creation page...</p>
        </section>
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
        <Button variant="contained">Submit</Button>
        </FormControl>
    </>)

}

export default AlbumCoverEditor