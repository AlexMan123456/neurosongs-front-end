import { useEffect, useState } from "react";
import { getSongById } from "../../../api";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import 'react-h5-audio-player/lib/styles.css';
import H5AudioPlayer from "react-h5-audio-player";
import StyledLink from "../styling/StyledLink";
import Loading from "../Loading";
import getSongDirectory from "../../references/get-song-directory";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import { Button } from "@mui/material";

function SongPage(){
    const {song_id} = useParams()
    const [song, setSong] = useState(null);
    const [songData, setSongData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [displayFront, setDisplayFront] = useState(true);
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

    return (<section>
        <img 
            src={displayFront ? frontCover : backCover}
            style={{
                width: "25vw",
                height: "auto"
            }}
            alt={`${songData.album.title}'s ${displayFront ? "front" : "back"} cover`}
        />
        <br/>
        {songData.album.back_cover_reference ? <Button onClick={() => {setDisplayFront((displayFront) => {return !displayFront})}}>View {displayFront ? "back" : "front"} cover</Button> : null}
        <h2>{songData.title}</h2>
        <p>{songData.artist.artist_name} (<StyledLink to={`/users/${songData.user_id}`}>@{songData.artist.username}</StyledLink>)</p>
        <h3>Description</h3>
        {songData.description.split("\n").map((paragraph, index) => {
            return <p key={`song-${songData.song_id}-paragraph-${index}`}>{paragraph}</p>
        })}
        <H5AudioPlayer src={song}/>
    </section>)
}

export default SongPage