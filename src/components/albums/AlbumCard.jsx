import { useLocation, useNavigate } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import AlbumImage from "./AlbumImage";

function AlbumCard({album}){
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <ListItem
            sx={{
                padding: "35vw 30pvh",
                float: 'left',
                width: '25%',
                border: 0.5,
                borderRadius: 0.7
            }}
        >
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
        </ListItem>
    )
}

export default AlbumCard