import { useLocation } from "react-router-dom";
import SongCard from "./SongCard";
import { List, ListItem, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import SongCardForList from "./SongCardForList";

function SongsList({songs, setSongs}){
    const location = useLocation();

    return (
        <List>
                {//!location.pathname.includes("/users") ? <TableCell>Username</TableCell> : null
                }
                {songs.map((song) => {
                    return (
                    <ListItem>
                        <SongCardForList key={`song-card-${song.song_id}`} song={song} setSongs={setSongs}/>
                    </ListItem>
                    )
                })}
        </List>
    )
}

export default SongsList