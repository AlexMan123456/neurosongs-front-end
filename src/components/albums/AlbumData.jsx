import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { getAlbumById } from "../../../api";
import AlbumSongCard from "./AlbumSongCard";
import StyledLink from "../styling/StyledLink";
import AlbumSongPlayer from "./AlbumSongPlayer";
import NowPlaying from "./NowPlaying";
import Loading from "../Loading";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { Button, List } from "@mui/material";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import formatDate from "../../utils/format-date";

function AlbumData({album, backCover, frontCover}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = searchParams.get("song_id")
    const [displayFront, setDisplayFront] = useState(true);

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
            alt={`${album.name}'s ${displayFront ? "front" : "back"} cover`}
        />
        <br/>
        {album.back_cover_reference ? <Button onClick={() => {setDisplayFront((displayFront) => {return !displayFront})}}>View {displayFront ? "back" : "front"} cover</Button> : null}
        <h3>Description</h3>
        {album.description.split("\n").map((paragraph, index) => {
            return <p key={`album-${album.album_id}-paragraph-${index}`}>{paragraph}</p>
        })}
        <p>Created: {formatDate(new Date(album.created_at))}</p>
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

export default AlbumData