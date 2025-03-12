import { useLocation, useParams } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { Box, Card, CardContent, ListItem, ListItemText } from "@mui/material";
import AlbumImage from "./AlbumImage";
import { ArrowDropDown } from "@mui/icons-material";
import AlbumCardOptions from "./AlbumCardOptions";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function AlbumCard({album, setAlbums}){
    const location = useLocation();
    const {user_id} = useParams();
    const {signedInUser} = useContext(UserContext)

    return (
        <ListItem>
            <Card variant="outlined">
                <CardContent>
                {location.pathname.includes("users") && signedInUser.user_id === user_id ? <AlbumCardOptions album={album} setAlbums={setAlbums}/> : null}
                <AlbumImage album={album}/>
                <ListItemText
                    slotProps={{
                        primary: { fontWeight: "bold" }
                    }}
                >
                    <StyledLink to={`/albums/${album.album_id}`}>
                        {album.title}
                    </StyledLink>
                </ListItemText>
                <ListItemText primary={album.artist.artist_name}/>
                {!location.pathname.includes("users") ? 
                <ListItemText>
                    <StyledLink to={`/users/${album.user_id}`}>@{album.artist.username}</StyledLink>
                </ListItemText>
                : null}
                </CardContent>
            </Card>
        </ListItem>
    )
}

export default AlbumCard