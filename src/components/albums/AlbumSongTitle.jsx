import { css } from "@emotion/css";
import { useSearchParams } from "react-router-dom"

function AlbumSongTitleButton({song, onClick, children}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = parseInt(searchParams.get("song_id"));

    return <button onClick={onClick} className={css`
        background-color: transparent;
        border: none;
        color: black;
        font-weight: ${song_id === song.song_id ? "bold" : "normal"};
        &:hover {
            color: grey;
        }
        `}>
            {children}
        </button>
}

export default AlbumSongTitleButton
