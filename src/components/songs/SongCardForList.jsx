import { useContext, useEffect, useState } from "react";
import StyledLink from "../styling/StyledLink"
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, TableBody, TableCell, TableRow } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import Loading from "../Loading";
import { UserContext } from "../../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import SongCardOptions from "./SongCardOptions";

function SongCardForList({song, setSongs}){
    const [frontCover, setFrontCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {signedInUser} = useContext(UserContext);
    const location = useLocation();
    const fontSize = "16px"
    
    useEffect(() => {
        setIsLoading(true);
        const frontCoverRef = ref(storage, getAlbumCoverDirectory({user_id: song.user_id, album_id: song.album_id, front_cover_reference: song.album.front_cover_reference}, "front"))
        getDownloadURL(frontCoverRef).then((frontCoverURL) => {
            setIsLoading(false);
            setFrontCover(frontCoverURL);
        }).catch((err) => {
            setIsLoading(false);
        })
    }, [])

    return (
        <>
            {isLoading ? <Loading/> : 
            <ListItemAvatar>
                <Avatar
                    component={Link}
                    to={`/albums/${song.album_id}`}
                    src={frontCover}
                    alt={`${song.album.title}'s front cover`}
                />
            </ListItemAvatar> }
            <ListItemText
                primary={<StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>}
                secondary={
                    <>
                        {song.artist.artist_name}
                        <br/>
                        {!location.pathname.includes("/users") ? <StyledLink to={`/users/${song.user_id}`}>@{song.artist.username}</StyledLink> : null}
                    </>
                }
            />
            {location.pathname.includes("users") && signedInUser.user_id === song.user_id ? <SongCardOptions song={song} setSongs={setSongs}/> : null}
        </>
    )
}

export default SongCardForList