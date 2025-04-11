import { useContext, useEffect, useState } from "react";
import StyledLink from "../styling/StyledLink"
import { Button, ListItem, ListItemText, Menu, MenuItem, TableBody, TableCell, TableRow } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import getAlbumCoverDirectory from "../../references/get-album-cover-directory";
import Loading from "../Loading";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useParams } from "react-router-dom";
import SongCardOptions from "./SongCardOptions";

function SongCard({song, setSongs}){
    const [frontCover, setFrontCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {signedInUser} = useContext(UserContext);
    const location = useLocation();
    const fontSize = "16px";
    const {user_id} = useParams();
    
    useEffect(() => {
        console.log(song.visibility)
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
        <TableBody
            sx={{ border: 0.5, borderRadius: 0.7 }}
            suppressHydrationWarning
        >
            <TableRow suppressHydrationWarning>
                <TableCell>
                {isLoading ? <Loading/> : <img
                    src={frontCover}
                    alt={`${song.album.title}'s front cover`}
                    style={{
                        width: "70px",
                        height: "auto"
                    }}
                    /> }
                </TableCell>
                <TableCell sx={{fontSize}}>
                    <StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>
                </TableCell>
                <TableCell sx={{fontSize}}>{song.artist.artist_name}</TableCell>
                {!location.pathname.includes("users") ?
                    <TableCell sx={{fontSize}}>
                        <StyledLink to={`/users/${song.user_id}`}>@{song.artist.username}</StyledLink>
                    </TableCell>
                : null
            }
                <TableCell sx={{fontSize}}>
                    <StyledLink to={`/albums/${song.album_id}`}>{song.album.title}</StyledLink>
                </TableCell>
                {signedInUser.user_id === user_id ? <TableCell sx={{fontSize}}>{song.visibility}</TableCell> : null}
                {location.pathname.includes("users") && signedInUser.user_id === song.user_id ? <SongCardOptions song={song} setSongs={setSongs}/> : null}
            </TableRow>
        </TableBody>
    )
}

export default SongCard