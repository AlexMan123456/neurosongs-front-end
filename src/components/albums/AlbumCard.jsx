import { useLocation, useParams } from "react-router-dom";
import StyledLink from "../styling/StyledLink";
import { Box, Card, CardContent, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import AlbumImage from "./AlbumImage";
import { ArrowDropDown } from "@mui/icons-material";
import AlbumCardOptions from "./AlbumCardOptions";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";

function AlbumCard({album, setAlbums}){
    const location = useLocation();
    const {user_id} = useParams();
    const {signedInUser} = useContext(UserContext)

    const {isLargeScreen} = useContext(ScreenSizeContext);

    return (
        <ListItem sx={{justifyContent: "center"}}>
            <Card variant="outlined" sx={{width: isLargeScreen ? "22%" : "100%"}}>
                <CardContent sx={{
                    justifyItems: "center"
                }}>
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
                    {signedInUser.user_id === user_id ? <ListItemText>Visibility: {album.visibility}</ListItemText> : null}
                </CardContent>
            </Card>
        </ListItem>
    )
}

export default AlbumCard