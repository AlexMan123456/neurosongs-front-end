import { Link } from "react-router-dom";

function SongCard(props){
    const {song} = props;
    return (<fieldset key={`song-card-${song.song_id}`}>
        <Link key={`song-title-${song.song_id}`} to={`/songs/${song.title}`}>{song.title}</Link>
        <Link key={`song-artist-${song.song_id}`} to={`/users/${song.username}`}>{song.artist.artist_name}</Link>
    </fieldset>)
}

export default SongCard