import { useEffect, useState } from "react"
import { getAlbums } from "../../../api";
import Loading from "../Loading";
import { List } from "@mui/material";
import AlbumCard from "../albums/AlbumCard";
import { useParams } from "react-router-dom";

function UserAlbums(){
    const {user_id} = useParams()
    const [albums, setAlbums] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAlbums({user_id}).then((albums) => {
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