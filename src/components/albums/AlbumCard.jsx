import StyledLink from "../styling/StyledLink";

function AlbumCard({album}){
    return (<li>
        <fieldset>
            <legend>
                <StyledLink to={`/users/${album.username}`}><p>{album.artist.artist_name}</p></StyledLink>
            </legend>
            <StyledLink to={`/albums/${album.album_id}`}>{album.title}</StyledLink>
        </fieldset>
    </li>)
}

export default AlbumCard