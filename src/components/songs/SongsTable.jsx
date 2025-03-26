import { useLocation } from "react-router-dom";
import SongCard from "./SongCard";
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function SongsTable({songs, setSongs}){
    const location = useLocation();

    return (
        <TableContainer>
            <Table suppressHydrationWarning>
                <TableHead>
                    <TableRow>
                        <TableCell>Album Cover</TableCell>
                        <TableCell>Song</TableCell>
                        <TableCell>Artist</TableCell>
                        {!location.pathname.includes("/users") ? <TableCell>Username</TableCell> : null}
                        <TableCell>Album</TableCell>
                    </TableRow>
                </TableHead>
                {songs.map((song) => {
                    return <SongCard key={`song-card-${song.song_id}`} song={song} setSongs={setSongs}/>
                })}
            </Table>
        </TableContainer>
    )
}

export default SongsTable