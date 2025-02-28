import { useLocation, useParams } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { Box, ListItem, ListItemText } from "@mui/material";
import AlbumImage from "./AlbumImage";
import { ArrowDropDown } from "@mui/icons-material";
import AlbumCardOptions from "./AlbumCardOptions";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function AlbumCard({album, setAlbums}){
    const location = useLocation();
    const {user_id} = useParams();
    const {signedInUser} = useContext(UserContext)

    return (
        <Box
            sx={{
                padding: "35vw 30pvh",
                float: 'left',
                width: '25%',
                border: 0.5,
                borderRadius: 0.7
            }}
        >
            {location.pathname.includes("users") && signedInUser.user_id === user_id ? <AlbumCardOptions album={album} setAlbums={setAlbums}/> : null}
            <AlbumImage album={album}/>
            <ListItem
                sx={{ fontWeight: "bold" }}
            >
                <StyledLink to={`/albums/${album.album_id}`}>
                    {album.title}
                </StyledLink>
            </ListItem>
            <ListItemText primary={album.artist.artist_name}/>
            {!location.pathname.includes("users") ? 
            <ListItemText>
                <StyledLink to={`/users/${album.user_id}`}>@{album.artist.username}</StyledLink>
            </ListItemText>
            : null}
        </Box>
    )
}

export default AlbumCard