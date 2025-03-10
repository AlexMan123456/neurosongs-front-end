import { useContext, useEffect, useState } from "react";
import CommentsSection from "../comments/CommentsSection"
import AlbumData from "./AlbumData"
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loading from "../Loading";
import { getAlbumById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import { storage } from "../../firebase-config";
import { Button, Divider } from "@mui/material";
import RatingSection from "../ratings/RatingSection";
import { UserContext } from "../../contexts/UserContext";

function AlbumPage(){
    const {album_id} = useParams();
    const [album, setAlbum] = useState({});
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [ratingVisibilityUpdated, setRatingVisibilityUpdated] = useState(false);
    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        async function getAlbumData(){
            try {
                setIsLoading(true);
                const album = await getAlbumById(album_id)
                const frontCoverRef = ref(storage, getAlbumCoverDirectory(album, "front"));
                const frontCoverURL = await getDownloadURL(frontCoverRef);
                setFrontCover(frontCoverURL);
                if(album.back_cover_reference){
                    const backCoverRef = ref(storage, getAlbumCoverDirectory(album, "back"));
                    const backCoverURL = await getDownloadURL(backCoverRef);
                    setBackCover(backCoverURL);
                }
                setAlbum(album);
                setIsLoading(false);
            } catch(err) {
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
        <br/>
        {signedInUser.user_id === album.user_id ? <Button component={Link} to={`/albums/${album_id}/edit`}>Edit</Button> : null}
        <AlbumData album={album} backCover={backCover} frontCover={frontCover}/>
        <RatingSection contentType="album" setRatingVisibilityUpdated={setRatingVisibilityUpdated}/>
        <Divider><h2>Album Comments</h2></Divider>
        <CommentsSection ratingVisibilityUpdated={ratingVisibilityUpdated} content={album}/>
    </>)
}

export default AlbumPage