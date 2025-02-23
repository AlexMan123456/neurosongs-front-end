import StyledLink from "../styling/StyledLink"
import { ListItem, ListItemText } from "@mui/material";

function SongCard({song}){
    return (<>
        <ListItem
            alignItems="center"
            sx={{ border: 0.5, borderRadius: 0.7 }}
        >
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
    </>)
}

export default SongCard