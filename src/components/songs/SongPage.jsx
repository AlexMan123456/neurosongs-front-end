import { Link, useNavigate, useParams } from "react-router-dom";
import CommentsSection from "../comments/CommentsSection"
import SongData from "./SongData"
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import { deleteSong, getSongById } from "../../../api";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getSongDirectory from "../../references/get-song-directory";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import { Button, Divider, Typography } from "@mui/material";
import RatingSection from "../ratings/RatingSection";
import { UserContext } from "../../contexts/UserContext";
import wait from "../../utils/wait";
import DeletePopup from "#components/utility/DeletePopup";
import Markdown from "react-markdown";

function SongPage(){
    const {song_id} = useParams()
    const [song, setSong] = useState(null);
    const [songData, setSongData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [ratingVisibilityUpdated, setRatingVisibilityUpdated] = useState(false);
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const {signedInUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllData(){
            try {
                setIsLoading(true);
    
                const songData = await getSongById(song_id, signedInUser.user_id);
                
                const songRef = ref(storage, getSongDirectory(songData));
                setSong(await getDownloadURL(songRef));
                
                const frontCoverRef = ref(storage, getAlbumCoverDirectory({...songData.album, album_id: songData.album_id, user_id: songData.user_id}, "front"));
                setFrontCover(await getDownloadURL(frontCoverRef));
                
                if(songData.album.back_cover_reference){
                    const backCoverRef = ref(storage, getAlbumCoverDirectory({...songData.album, album_id: songData.album_id, user_id: songData.user_id}, "back"));
                    setBackCover(await getDownloadURL(backCoverRef));
                }
                
                setSongData(songData);
                setIsLoading(false);
            } catch(err) {
                setIsLoading(false);
                setError("Error fetching data. Please try again later.")
            }
        }
        getAllData()
    }, [])

    function handleDelete(){
        if(signedInUser.user_id !== songData.user_id){
            setError("This isn't even your song!")
            return wait(4).then(() => {
                setError("");
            })
        }
        setIsLoading(true);
        return deleteSong(song_id).then(() => {
            const songRef = ref(storage, getSongDirectory(songData));
            return deleteObject(songRef);
        }).then(() => {
            navigate(`/users/${songData.user_id}`);
        }).catch((err) => {
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
        return <Typography color="error">{error}</Typography>
    }

    return (<main>
        {signedInUser.user_id === songData.user_id ? <Button component={Link} to={`/songs/${songData.song_id}/edit`}>Edit Song</Button> : null}
        {signedInUser.user_id === songData.user_id ? <Button color="error" onClick={() => {setShowDeleteBackdrop(true)}}>Delete Song</Button> : null}
        <SongData song={song} songData={songData} frontCover={frontCover} backCover={backCover}/>
        <RatingSection setRatingVisibilityUpdated={setRatingVisibilityUpdated} contentType="song"/>
        <Divider><h2>Comments</h2></Divider>
        <CommentsSection content={songData} ratingVisibilityUpdated={ratingVisibilityUpdated}/>
        {<DeletePopup
            showMessage={showDeleteBackdrop}
            setShowMessage={setShowDeleteBackdrop}
            onDelete={handleDelete}
        >
            <Markdown>
                {`Are you sure you want to delete _${songData.title}_?`} 
            </Markdown>    
        </DeletePopup>}
    </main>)
}

export default SongPage