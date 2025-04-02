import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import AlbumSongCard from "./AlbumSongCard"
import { useContext } from "react"
import { ScreenSizeContext } from "#contexts/ScreenSizeContext"

function AlbumSongTable({songs}){
    const {isLargeScreen} = useContext(ScreenSizeContext);
    return (
        <TableContainer sx={{width: isLargeScreen ? "90%" : "99.9%"}}>
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