import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Button, ListItem, ListItemText } from "@mui/material";

function SongReorderCard({song, setSongs}){
    function handleShiftUp(){
        setSongs((songs) => {
            const newSongs = [...songs];
            if(song.index === 1){
                newSongs[0] = [newSongs[newSongs.length-1], newSongs[newSongs.length-1] = newSongs[0]][0]
                newSongs[0].index = [newSongs[newSongs.length-1].index, newSongs[newSongs.length-1].index = newSongs[0].index][0]
            } else {
                newSongs[song.index-1] = [newSongs[song.index-2], newSongs[song.index-2] = newSongs[song.index-1]][0]
                newSongs[song.index-1].index = [newSongs[song.index-2].index, newSongs[song.index-2].index = newSongs[song.index-1].index][0]
            }
            return newSongs;
        })
    }

    function handleShiftDown(){
        setSongs((songs) => {
            const newSongs = [...songs];
            if(song.index === newSongs.length){
                newSongs[song.index-1] = [newSongs[0], newSongs[0] = newSongs[song.index-1]][0]
                newSongs[song.index-1].index = [newSongs[0].index, newSongs[0].index = newSongs[song.index-1].index][0]
            } else {
                newSongs[song.index-1] = [newSongs[song.index], newSongs[song.index] = newSongs[song.index-1]][0]
                newSongs[song.index-1].index = [newSongs[song.index].index, newSongs[song.index].index = newSongs[song.index-1].index][0]
            }
            return newSongs;
        })
    }

    return (
        <ListItem sx={{display: "table-row"}}>
            <ListItemText primary={`${song.index}. ${song.title}`}/>
            <Button onClick={handleShiftUp}>
                <ArrowUpward/>
            </Button>
            <Button onClick={handleShiftDown}>
                <ArrowDownward/>
            </Button>
        </ListItem>
    )
}

export default SongReorderCard