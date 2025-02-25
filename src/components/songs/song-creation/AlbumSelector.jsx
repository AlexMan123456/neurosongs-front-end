import { useContext, useEffect, useState } from "react";
import { getAlbums } from "../../../../api";
import { List, ListItemButton, ListItemText } from "@mui/material";
import StyledImage from "../../styling/StyledImage";
import StyledLink from "../../styling/StyledLink";
import { UserContext } from "../../../contexts/UserContext";
import { Link, useParams } from "react-router-dom";
import ForbiddenAccess from "../../errors/ForbiddenAccess";
import Loading from "../../Loading";
import wait from "../../../utils/wait";
import SongCreationAlbumCard from "./SongCreationAlbumCard";

function AlbumSelector(){
    const {signedInUser} = useContext(UserContext);
    const {user_id} = useParams();
    const [albums, setAlbums] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAlbums().then((albums) => {
            setIsLoading(false);
            setAlbums(albums);
        })
        
        .catch((err) => {
            setIsLoading(false);
            setError("Error loading page. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== user_id){
        return <ForbiddenAccess/>
    }

    if(error){
        return <p>{error}</p>
    }


    if(albums.length === 0){
        return (<section>
            <h2>You have no albums to add songs to.</h2>
            <p>Get started by <StyledLink to={`/users/${user_id}/albums/create`}></StyledLink></p>
        </section>)
    }

    return (<section>
        <h2>Please select an album to upload a song to</h2>
        <List>
            {albums.map((album) => {
                return (<SongCreationAlbumCard album={album}/>)
            })}
        </List>
    </section>)
}

export default AlbumSelector