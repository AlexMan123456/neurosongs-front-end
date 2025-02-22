import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase-config";
import { Avatar } from "@mui/material";
import { css } from "@emotion/css";

function AlbumImages({album}){
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        const frontCoverRef = ref(storage, `${album.user_id}/albums/${album.album_id}/images/${album.front_cover_reference}`);
        const backCoverRef = ref(storage, `${album.user_id}/albums/${album.album_id}/images/${album.back_cover_reference}`);
        getDownloadURL(frontCoverRef).then((frontCoverURL) => {
            setFrontCover(frontCoverURL);
            if(!backCoverRef){
                return Promise.resolve();
            }
            return getDownloadURL(backCoverRef);
        }).then((backCoverURL) => {
            setIsLoading(false);
            if(backCoverRef){
                setBackCover(backCoverURL);
            }
        }).catch((err) => {
            setError("Could not set album cover. Please try again later.")
        })
    }, [])

    return <img style={{
        width: "10vw",
        height: "auto"
    }} src={frontCover} alt={`${album.title} front cover`}/>
}

export default AlbumImages