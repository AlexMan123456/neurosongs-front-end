import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase-config";
import getAlbumCoverDirectory from "../../../references/get-album-cover-directory";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Loading";
import { ListItemButton, ListItemText } from "@mui/material";
import StyledImage from "../../styling/StyledImage";

function SongCreationAlbumCard({album}){
    const {user_id} = useParams()
    const [frontCover, setFrontCover] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const frontCoverRef = ref(storage, getAlbumCoverDirectory(album, "front"))
        getDownloadURL(frontCoverRef).then((frontCoverURL) => {
            setIsLoading(false);
            setFrontCover(frontCoverURL);
        }).catch((err) => {
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    return (<ListItemButton component={Link} to={`/albums/${album.album_id}/songs/create`}>
        <StyledImage src={frontCover} alt={`${album.title}'s front cover`}/>
        <ListItemText primary={album.title}/>
    </ListItemButton>)
}

export default SongCreationAlbumCard