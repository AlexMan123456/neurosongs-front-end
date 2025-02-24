import { useParams } from "react-router-dom";
import CommentsSection from "../comments/CommentsSection"
import SongData from "./SongData"
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { getSongById } from "../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getSongDirectory from "../../references/get-song-directory";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";

function SongPage(){
    const {song_id} = useParams()
    const [song, setSong] = useState(null);
    const [songData, setSongData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);

    useEffect(() => {
        async function getAllData(){
            try {
                setIsLoading(true);
    
                const songData = await getSongById(song_id);
                setSongData(songData);
    
                const songRef = ref(storage, getSongDirectory(songData));
                setSong(await getDownloadURL(songRef));
    
                const frontCoverRef = ref(storage, getAlbumCoverDirectory({...songData.album, album_id: songData.album_id, user_id: songData.user_id}, "front"));
                setFrontCover(await getDownloadURL(frontCoverRef));
    
                const backCoverRef = ref(storage, getAlbumCoverDirectory({...songData.album, album_id: songData.album_id, user_id: songData.user_id}, "back"));
                setBackCover(await getDownloadURL(backCoverRef));
    
                setIsLoading(false);
            } catch(err) {
                console.log(err)
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

    return (<>
        <SongData song={song} songData={songData} frontCover={frontCover} backCover={backCover}/>
        <CommentsSection content={songData}/>
    </>)
}

export default SongPage