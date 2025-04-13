import { getAlbums } from "#api";
import Loading from "#components/Loading";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import AlbumCard from "./AlbumCard";

function AllAlbums(){
    const [albums, setAlbums] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAlbums().then((albums) => {
            setAlbums(albums);
            setIsLoading(false);
        }).catch(() => {
            setError("Could not fetch albums. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Typography color="error">{error}</Typography>
    }

    return albums.map((album) => {
        return <AlbumCard key={`album-card-${album.album_id}`} album={album}/>
    })
}

export default AllAlbums