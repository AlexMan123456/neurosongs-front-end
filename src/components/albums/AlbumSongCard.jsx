import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AlbumSongTitleButton from "./AlbumSongTitle.jsx"
import StyledLink from "../styling/StyledLink";

function AlbumSongCard({song}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = parseInt(searchParams.get("song_id"));
    const location = useLocation();
    const navigate = useNavigate();

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

    return (<li>
        <fieldset>
            <legend>
                <p>
                    <AlbumSongTitleButton onClick={handleClick} song={song}>{song.title}</AlbumSongTitleButton> - {song.artist.artist_name}
                </p>
            </legend>
            {song_id === song.song_id ? <StyledLink to={`/songs/${song.song_id}`}>Go to song page</StyledLink> : null}
        </fieldset>
    </li>)
}

export default AlbumSongCard