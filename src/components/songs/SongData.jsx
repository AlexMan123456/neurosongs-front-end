import { useState } from "react";
import 'react-h5-audio-player/lib/styles.css';
import H5AudioPlayer from "react-h5-audio-player";
import StyledLink from "../styling/StyledLink";
import { Button } from "@mui/material";
import formatDate from "../../utils/format-date";

function SongData({song, songData, frontCover, backCover}){
    const [displayFront, setDisplayFront] = useState(true);

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
        <p>Album: <StyledLink to={`/albums/${songData.album_id}`}>{songData.album.title}</StyledLink></p>
        <h3>Description</h3>
        {songData.description.split("\n").map((paragraph, index) => {
            return <p key={`song-${songData.song_id}-paragraph-${index}`}>{paragraph}</p>
        })}
        <H5AudioPlayer src={song}/>
        <p>Created: {formatDate(new Date(songData.created_at))}</p>
    </section>)
}

export default SongData