import { useLocation, useParams } from "react-router-dom";
import SongCard from "./SongCard";
import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "#contexts/UserContext";

function SongsTable({songs, setSongs}){
    const location = useLocation();
    const {user_id} = useParams();
    const {signedInUser} = useContext(UserContext)

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
                        {location.pathname.includes("/users") && signedInUser.user_id === user_id ? <TableCell>Visibility</TableCell> : null}
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