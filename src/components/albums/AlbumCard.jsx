import { useLocation } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import AlbumImages from "./AlbumImages";

function AlbumCard({album}){
    const location = useLocation();

    return (
        <ListItemButton
            sx={{
                padding: "80px 40px",
                float: 'left',
                width: '25%',
                border: 0.3,
                borderRadius: 0.7
            }}
        >
        <AlbumImages album={album}/>
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