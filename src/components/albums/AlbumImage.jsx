import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase-config";
import Loading from "../Loading";

function AlbumImage({album}){
    const [frontCover, setFrontCover] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const frontCoverRef = ref(storage, `${album.user_id}/albums/${album.album_id}/images/${album.front_cover_reference}`);
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
        <img style={{
            width: "10vw",
            height: "auto"
        }} src={frontCover} alt={`${album.title} front cover`}/>
    </div>)
}

export default AlbumImage