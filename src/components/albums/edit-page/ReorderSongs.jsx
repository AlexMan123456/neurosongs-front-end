import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { Box, Button, List, ListItemText } from "@mui/material"
import SongReorderCard from "./SongReorderCard"

function ReorderSongs({songs, setSongs}){
    return (
        <List>
            {songs.map((song) => {
                return <SongReorderCard key={`song-${song.song_id}`} song={song} setSongs={setSongs}/>
            })}
        </List>
    )
}

export default ReorderSongs