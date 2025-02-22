import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { getAlbumById } from "../../../api";
import SongCard from "../songs/SongCard";
import AlbumSongCard from "./AlbumSongCard";
import StyledLink from "../styling/StyledLink";
import H5AudioPlayer from "react-h5-audio-player";
import AlbumSongPlayer from "./AlbumSongPlayer";
import NowPlaying from "./NowPlaying";
import Loading from "../Loading";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { Button, List } from "@mui/material";

function AlbumPage(){
    const {album_id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = searchParams.get("song_id")
    const [album, setAlbum] = useState({});
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);
    const [displayFront, setDisplayFront] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getAlbumData(){
            try {
                setIsLoading(true);
                const album = await getAlbumById(album_id)
                setAlbum(album);
                const frontCoverRef = ref(storage, `${album.user_id}/albums/${album_id}/images/${album.front_cover_reference}`);
                const frontCoverURL = await getDownloadURL(frontCoverRef);
                setFrontCover(frontCoverURL);
                if(!album.back_cover_reference){
                    return;
                }
                const backCoverRef = ref(storage, `${album.user_id}/albums/${album_id}/images/${album.back_cover_reference}`);
                const backCoverURL = await getDownloadURL(backCoverRef);
                setBackCover(backCoverURL);
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
    <header>
        <h2>{album.title}</h2>
        <p>By {album.artist.artist_name} (<StyledLink to={`/users/${album.user_id}`}>@{album.artist.username}</StyledLink>)</p>
        <img 
            src={displayFront ? frontCover : backCover}
            style={{
                width: "25vw",
                height: "auto"
            }}
            alt={`${album.name}'s ${displayFront ? "front" : "back"} cover`}></img>
        <br/>
        {album.back_cover_reference ? <Button onClick={() => {setDisplayFront((displayFront) => {return !displayFront})}}>View {displayFront ? "front" : "back"} cover</Button> : null}
        {song_id
        ? <div>
            <NowPlaying/>    
            <AlbumSongPlayer album={album}/>
        </div>
        : null}
        </header>
        <section>
        <List>
            {album.songs.map((song, index) => {
                return <AlbumSongCard key={`song-card-${song.song_id}`} song={song} index={index+1}/>
            })}
        </List>
    </section>
    </>)
}

export default AlbumPage