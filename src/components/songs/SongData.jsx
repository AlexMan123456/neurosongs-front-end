import { useContext, useState } from "react";
import 'react-h5-audio-player/lib/styles.css';
import H5AudioPlayer from "react-h5-audio-player";
import StyledLink from "../styling/StyledLink";
import { Button, Typography } from "@mui/material";
import formatDate from "../../utils/format-date";
import getRatingColour from "../../utils/get-rating-colour";
import Markdown from "react-markdown";
import { formatMarkdownWithLineBreaks } from "#utils";
import { UserContext } from "#contexts/UserContext";

function SongData({song, songData, frontCover, backCover}){
    const [displayFront, setDisplayFront] = useState(true);
    const {signedInUser} = useContext(UserContext);

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
        {songData.description ? 
        <Markdown>
            {formatMarkdownWithLineBreaks(songData.description)}
        </Markdown>
        : null}
        <H5AudioPlayer src={song} showJumpControls={false}/>
        <p>Created: {formatDate(new Date(songData.created_at))}</p>
        {signedInUser.user_id === songData.user_id ? <p>Visibility: {songData.visibility}</p> : null}
    </section>)
}

export default SongData