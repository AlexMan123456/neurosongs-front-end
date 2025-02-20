import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getAlbumById } from "../../../api";
import SongCard from "../songs/SongCard";
import AlbumSongCard from "./AlbumSongCard";
import StyledLink from "../styling/StyledLink";

function AlbumPage(){
    const {album_id} = useParams();
    const [album, setAlbum] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(album_id).then((album) => {
            setIsLoading(false);
            setAlbum(album);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not get album. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <p>Now Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{album.title}</h2>
        <p>By <StyledLink to={`/users/${album.username}`}>{album.artist.artist_name}</StyledLink></p> 
        <ol>
            {album.songs.map((song) => {
                return <AlbumSongCard key={`song-card-${song.song_id}`} song={song}/>
            })}
        </ol>
    </section>)
}

export default AlbumPage