import { useLocation, useNavigate } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import AlbumImage from "./AlbumImage";

function AlbumCard({album}){
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <ListItemButton
            sx={{
                padding: "35vw 30pvh",
                float: 'left',
                width: '25%',
                border: 0.5,
                borderRadius: 0.7
            }}
            onClick={() => {navigate(`/albums/${album.album_id}`)}}
        >
        <AlbumImage album={album}/>
            <ListItem
                sx={{ fontWeight: "bold" }}
            >{album.title}</ListItem>
            <ListItemText primary={album.artist.artist_name}/>
            {!location.pathname.includes("users") ? 
            <ListItemText>
                <StyledLink to={`/users/${album.user_id}`}>{album.artist.username}</StyledLink>
            </ListItemText>
            : null}
        </ListItemButton>
    )
}

export default AlbumCard