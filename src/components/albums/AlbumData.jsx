import { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"
import StyledLink from "../styling/StyledLink";
import AlbumSongPlayer from "./album-songs/AlbumSongPlayer";
import NowPlaying from "./NowPlaying";
import { Button, List, Typography } from "@mui/material";
import formatDate from "../../utils/format-date";
import { UserContext } from "../../contexts/UserContext";
import AlbumSongsTable from "./album-songs/AlbumSongsTable";
import Markdown from "react-markdown";
import { formatMarkdownWithLineBreaks } from "#utils";
import AlbumSongDetails from "./album-songs/AlbumSongDetails";
import CommentsSection from "#components/comments/CommentsSection";
import Loading from "#components/Loading";
import { getSongById } from "#api";
import AlbumSongComments from "./album-songs/AlbumSongComments";

function AlbumData({album, backCover, frontCover}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = parseInt(searchParams.get("song_id"));
    const [displayFront, setDisplayFront] = useState(true);
    const {album_id} = useParams();
    const {signedInUser} = useContext(UserContext);
    const [showSongComments, setShowSongComments] = useState(false);
    const [song, setSong] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(song_id){
            setIsLoading(true);
            getSongById(song_id).then((song) => {
                setSong(song);
                setIsLoading(false);
            }).catch((err) => {
                setError("Could not fetch song. Please try again later.");
                setIsLoading(false);
            })
        }
    }, [song_id])

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
            alt={`${album.title}'s ${displayFront ? "front" : "back"} cover`}
        />
        <br/>
        {album.back_cover_reference ? <Button onClick={() => {setDisplayFront((displayFront) => {return !displayFront})}}>View {displayFront ? "back" : "front"} cover</Button> : null}
        <h3>Description</h3>
        {album.description ? 
        <Markdown>
            {formatMarkdownWithLineBreaks(album.description)}
        </Markdown>
        : null}
        <p>Created: {formatDate(new Date(album.created_at))}</p>
        {song_id
        ? 
        (isLoading 
            ? <Loading/> : 
            error 
                ? <Typography color="error">{error}</Typography> :
                    <div>
                        <NowPlaying/>
                        <AlbumSongPlayer album={album}/>
                        {song.description ? <AlbumSongDetails song={song}/> : null}
                    </div>
        )
        : null}
        </header>
        <section>
        <List>
            <AlbumSongsTable songs={album.songs}/>
            {signedInUser.user_id === album.user_id ? <Button component={Link} to={`/albums/${album_id}/songs/create`}>Add a new song</Button> : null}
        </List>
    </section>
    </>)
}

export default AlbumData