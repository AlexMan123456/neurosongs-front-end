import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext";

function AlbumSongAdder(){
    const {user_id, album_id} = useParams();
    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        
    }, [])
}

export default AlbumSongAdder