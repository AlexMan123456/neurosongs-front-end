import { useEffect, useState } from "react";
import StyledLink from "../styling/StyledLink"
import { ListItem, ListItemText } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";

function SongCard({song}){
    const [frontCover, setFrontCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
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
        <ListItem
            alignItems="center"
            sx={{ border: 0.5, borderRadius: 0.7 }}
        >
            <img
                src={frontCover}
                alt={`${song.album.title}'s front cover`}
                style={{
                    width: "50px",
                    height: "auto"
                }}
            />
            <ListItemText>
                <StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>
            </ListItemText>
            <ListItemText>{song.artist.artist_name}</ListItemText>
            {!location.pathname.includes("users") ?
            <ListItemText>
                <StyledLink to={`/users/${song.user_id}`}>@{song.artist.username}</StyledLink>
            </ListItemText>
            : null
            }
            <ListItemText>
                <StyledLink to={`/albums/${song.album_id}`}>{song.album.title}</StyledLink>
            </ListItemText>
        </ListItem>
    )
}

export default SongCard