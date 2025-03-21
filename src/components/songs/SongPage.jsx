import { Link, useParams } from "react-router-dom";
import CommentsSection from "../comments/CommentsSection"
import SongData from "./SongData"
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import { getSongById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getSongDirectory from "../../references/get-song-directory";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import { Button, Divider } from "@mui/material";
import RatingSection from "../ratings/RatingSection";
import { UserContext } from "../../contexts/UserContext";

function SongPage(){
    const {song_id} = useParams()
    const [song, setSong] = useState(null);
    const [songData, setSongData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [ratingVisibilityUpdated, setRatingVisibilityUpdated] = useState(false);
    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        async function getAllData(){
            try {
                setIsLoading(true);
    
                const songData = await getSongById(song_id);
                
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

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<main>
        {signedInUser.user_id === songData.song_id ? <Button component={Link} to={`/songs/${songData.song_id}/edit`}>Edit</Button> : null}
        <SongData song={song} songData={songData} frontCover={frontCover} backCover={backCover}/>
        <RatingSection setRatingVisibilityUpdated={setRatingVisibilityUpdated} contentType="song"/>
        <Divider><h2>Comments</h2></Divider>
        <CommentsSection content={songData} ratingVisibilityUpdated={ratingVisibilityUpdated}/>
    </main>)
}

export default SongPage