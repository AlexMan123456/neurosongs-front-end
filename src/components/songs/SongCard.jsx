import StyledLink from "../styling/StyledLink";

function SongCard(props){
    const {song} = props;
    return (<fieldset key={`song-card-${song.song_id}`}>
        <StyledLink key={`song-title-${song.song_id}`} to={`/songs/${song.title}`}>{song.title}</StyledLink>
        <StyledLink key={`song-artist-${song.song_id}`} to={`/users/${song.username}`}>{song.artist.artist_name}</StyledLink>
    </fieldset>)
}

export default SongCard