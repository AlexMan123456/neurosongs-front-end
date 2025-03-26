import { List, ListItem } from "@mui/material";
import SongCardForList from "./SongCardForList";

function SongsList({songs, setSongs}){
    return (
        <List suppressHydrationWarning>
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