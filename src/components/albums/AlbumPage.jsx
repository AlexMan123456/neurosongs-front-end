import { useContext, useEffect, useState } from "react";
import CommentsSection from "../comments/CommentsSection"
import AlbumData from "./AlbumData"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "../Loading";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import { storage } from "../../firebase-config";
import { Button, Divider } from "@mui/material";
import RatingSection from "../ratings/RatingSection";
import { UserContext } from "../../contexts/UserContext";
import { deleteAlbum, deleteSong, getAlbumById } from "#api";
import { getSongDirectory } from "#references";
import DeletePopup from "#components/utility/DeletePopup";
import Markdown from "react-markdown";
import { wait } from "#utils";
import ForbiddenAccess from "#components/errors/ForbiddenAccess";

function AlbumPage(){
    const {album_id} = useParams();
    const [album, setAlbum] = useState({});
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [ratingVisibilityUpdated, setRatingVisibilityUpdated] = useState(false);
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const {signedInUser} = useContext(UserContext);
    const [forbidAccess, setForbidAccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAlbumData(){
            try {
                setIsLoading(true);
                const album = await getAlbumById(album_id, signedInUser.user_id);
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
                if(err.status === 403){
                    setForbidAccess(true);
                    return;
                }
                setError("Could not get album. Please try again later.");
            }
        }
        getAlbumData()
    }, [])

    function handleDelete(){
        if(signedInUser.user_id !== album.user_id){
            setError("This isn't even your album!")
            return wait(4).then(() => {
                setError("");
            })
        }
        setIsLoading(true);
        return deleteAlbum(album_id).then(() => {
            const promises = []
            if(album.front_cover_reference !== "Default"){
                const frontCoverRef = ref(storage, getAlbumCoverDirectory(album, "front"));
                promises.push(deleteObject(frontCoverRef));
            }
            if(album.back_cover_reference){
                const backCoverRef = ref(storage, getAlbumCoverDirectory(album, "back"));
                promises.push(deleteObject(backCoverRef));
            }
            return Promise.all(promises);
        })
        .then(() => {
            const promises = []
            for(const song of album.songs){
                const songRef = ref(storage, getSongDirectory(song));
                promises.push(deleteObject(songRef));
            }
            return Promise.all(promises)
        }).then(() => {
            return wait(2);
        }).then(() => {
            setIsLoading(false);
            navigate(`/users/${album.user_id}`);
        }).catch(() => {
            setError("Error deleting song. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    if(forbidAccess){
        return <ForbiddenAccess/>
    }
    
    return (<>
        <br/>
        {signedInUser.user_id === album.user_id ? 
        <>
            <Button component={Link} to={`/albums/${album_id}/edit`}>Edit album</Button> 
            <Button color="error" onClick={() => {setShowDeleteBackdrop(true)}}>Delete album</Button>
        </>
        : null}
        <AlbumData album={album} backCover={backCover} frontCover={frontCover}/>
        <RatingSection contentType="album" setRatingVisibilityUpdated={setRatingVisibilityUpdated}/>
        <Divider><h2>Album Comments</h2></Divider>
        <CommentsSection ratingVisibilityUpdated={ratingVisibilityUpdated} content={album}/>
        {
            <DeletePopup
                showMessage={showDeleteBackdrop}
                setShowMessage={setShowDeleteBackdrop}
                onDelete={handleDelete}
            >
                <Markdown>
                    {`Are you sure you want to delete _${album.title}_?`}
                </Markdown>
            </DeletePopup>
        }
    </>)
}

export default AlbumPage