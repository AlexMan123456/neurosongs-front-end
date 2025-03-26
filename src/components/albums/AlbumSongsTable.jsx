import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import AlbumSongCard from "./AlbumSongCard"

function AlbumSongTable({songs}){
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Artist</TableCell>
                    </TableRow>
                </TableHead>
                {songs.map((song, index) => {
                    return <AlbumSongCard key={`song-card-${song.song_id}`} song={song} index={index+1}/>
                })}
            </Table>
        </TableContainer>
    )
}

export default AlbumSongTable