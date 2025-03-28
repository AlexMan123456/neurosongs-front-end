import { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom"
import { getAlbumById } from "../../../api";
import AlbumSongCard from "./AlbumSongCard";
import StyledLink from "../styling/StyledLink";
import AlbumSongPlayer from "./AlbumSongPlayer";
import NowPlaying from "./NowPlaying";
import { Button, List, Typography } from "@mui/material";
import formatDate from "../../utils/format-date";
import getRatingColour from "../../utils/get-rating-colour";
import { UserContext } from "../../contexts/UserContext";
import AlbumSongsTable from "./AlbumSongsTable";
import Markdown from "react-markdown";

function AlbumData({album, backCover, frontCover}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = searchParams.get("song_id")
    const [displayFront, setDisplayFront] = useState(true);
    const {album_id} = useParams();
    const {signedInUser} = useContext(UserContext);

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
        <Markdown>
            {album.description.split("\n").map((line) => {
                return line + "  \n"
            }).join("")}
        </Markdown>
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
            <AlbumSongsTable songs={album.songs}/>
            {signedInUser.user_id === album.user_id ? <Button component={Link} to={`/albums/${album_id}/songs/create`}>Add a new song</Button> : null}
        </List>
    </section>
    </>)
}

export default AlbumData