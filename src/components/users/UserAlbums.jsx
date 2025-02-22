import { useEffect, useState } from "react"
import { getAlbumsFromUser } from "../../../api";
import Loading from "../Loading";
import { List } from "@mui/material";
import AlbumCard from "../albums/AlbumCard";

function UserAlbums({user_id}){
    const [albums, setAlbums] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAlbumsFromUser(user_id).then((albums) => {
            setIsLoading(false);
            setAlbums(albums);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch albums. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<List>
        {albums.map((album) => {
            return <AlbumCard key={`album-card-${album.album_id}`} album={album}/>
        })}
    </List>)
}

export default UserAlbums