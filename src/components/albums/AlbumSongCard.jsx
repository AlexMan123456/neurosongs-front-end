import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { ListItemButton, ListItemText } from "@mui/material";

function AlbumSongCard({song, index}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = parseInt(searchParams.get("song_id"));
    const location = useLocation();
    const navigate = useNavigate();

    function handleClick(event){
        event.preventDefault();
        if(song_id === song.song_id){
            searchParams.delete("song_id")
            navigate(`${location.pathname}`);
            return;
        }
        searchParams.set("song_id", song.song_id);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    }

    return (<ListItemButton
            selected={song_id === song.song_id}
            sx={{border: 0.5, borderRadius: 0.7}}
            onClick={handleClick}
        >
        <ListItemText>
            {index}. <StyledLink to={`/songs/${song.song_id}`}>{song.title}</StyledLink>
        </ListItemText>
        <ListItemText primary={song.artist.artist_name}/>
    </ListItemButton>)
}

export default AlbumSongCard