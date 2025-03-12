import { useLocation } from "react-router-dom";
import SongCard from "./SongCard";
import { List, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function SongsList({songs, setSongs}){
    const location = useLocation();

    return (
        <List>
                {//!location.pathname.includes("/users") ? <TableCell>Username</TableCell> : null
                }
                {songs.map((song) => {
                    return (
                    <ListItem>
                        <SongCard key={`song-card-${song.song_id}`} song={song} setSongs={setSongs}/>
                    </ListItem>
                    )
                })}
        </List>
    )
}

export default SongsList