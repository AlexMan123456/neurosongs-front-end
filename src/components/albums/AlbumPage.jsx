import { useEffect, useState } from "react";
import CommentsSection from "../comments/CommentsSection"
import AlbumData from "./AlbumData"
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../Loading";
import { getAlbumById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import { storage } from "../../firebase-config";

function AlbumPage(){
    const {album_id} = useParams();
    const [album, setAlbum] = useState({});
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getAlbumData(){
            try {
                setIsLoading(true);
                const album = await getAlbumById(album_id)
                setAlbum(album);
                const frontCoverRef = ref(storage, getAlbumCoverDirectory(album, "front"));
                const frontCoverURL = await getDownloadURL(frontCoverRef);
                setFrontCover(frontCoverURL);
                if(!album.back_cover_reference){
                    return;
                }
                const backCoverRef = ref(storage, getAlbumCoverDirectory(album, "back"));
                const backCoverURL = await getDownloadURL(backCoverRef);
                setBackCover(backCoverURL);
                setIsLoading(false);
            } catch(err) {
                console.log(err)
                setIsLoading(false);
                setError("Could not get album. Please try again later.")
            }
        }
        getAlbumData()
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }
    
    return (<>
        <AlbumData album={album} backCover={backCover} frontCover={frontCover}/>
        <CommentsSection content={album}/>
    </>)
}

export default AlbumPage