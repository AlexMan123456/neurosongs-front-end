import { useLocation } from "react-router-dom";
import SongCard from "./SongCard";
import { List, ListItem, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import SongCardForList from "./SongCardForList";

function SongsList({songs, setSongs}){
    const location = useLocation();

    return (
        <List>
            {songs.map((song) => {
                return (
                <ListItem key={`song-list-item-${song.song_id}`} sx={{border: 0.5}}>
                    <SongCardForList song={song} setSongs={setSongs}/>
                </ListItem>
                )
            })}
        </List>
    )
}

export default SongsList