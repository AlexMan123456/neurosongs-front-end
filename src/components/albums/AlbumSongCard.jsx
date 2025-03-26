import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";

function AlbumSongCard({song, index}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = parseInt(searchParams.get("song_id"));
    const location = useLocation();
    const navigate = useNavigate();
    const [focus, setFocus] = useState(false);

    function handleClick(event){
        event.preventDefault();
        if(song_id === song.song_id){
            searchParams.delete("song_id")
            navigate(`${location.pathname}`);
            return;
        }
        searchParams.set("song_id", song.song_id);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    }

    return (<TableBody>
            <TableRow
                hover={true}
                onFocus={() => {setFocus(true)}}
                onBlur={() => {setFocus(false)}}
                component={Link}
                to={`${location.pathname}?song_id=${song.song_id}`}
                selected={song_id === song.song_id}
                sx={{border: 0.5, borderRadius: 0.7, backgroundColor: focus ? "#F5F5F5" : null}}
            >
                <TableCell>{index}</TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.artist.artist_name}</TableCell>
            </TableRow>
    </TableBody>)
}

export default AlbumSongCard