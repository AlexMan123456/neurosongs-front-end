import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase-config";
import Loading from "../Loading";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import StyledImage from "../styling/StyledImage";

function AlbumImage({album}){
    const [frontCover, setFrontCover] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const frontCoverRef = ref(storage, getAlbumCoverDirectory(album, "front"));
        getDownloadURL(frontCoverRef).then((frontCoverURL) => {
            setIsLoading(false);
            setFrontCover(frontCoverURL);
        }).catch((err) => {
            setError("Could not set album cover. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<div>
        <StyledImage src={frontCover} alt={`${album.title} front cover`}/>
    </div>)
}

export default AlbumImage