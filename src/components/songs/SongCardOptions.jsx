import { Box, MenuItem } from "@mui/material"
import DropdownMenu from "../utility/DropdownMenu"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import DeletePopup from "../utility/DeletePopup";
import Markdown from "react-markdown";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading";

function SongCardOptions({song}){
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const {signedInUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    function handleDelete(){
        if(signedInUser.user_id !== song.user_id){
            setError("This isn't even your song!")
            return;
        }
        deleteSong(song.song_id).then(() => {
            
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (<Box>
        <DropdownMenu>
            <MenuItem
                component={Link}
                to={`/songs/${song.song_id}/edit`}
            >
                Edit song
            </MenuItem>
            <MenuItem
                onClick={() => {setShowDeleteBackdrop(true)}}
            >Delete song</MenuItem>
        </DropdownMenu>
        <DeletePopup
            showMessage={showDeleteBackdrop}
            setShowMessage={setShowDeleteBackdrop}
            onDelete={handleDelete}
        >
            <Markdown>
                {`Are you sure you want to delete _${song.title}_?`}
            </Markdown>
            </DeletePopup>
        {error ? <p>{error}</p> : null}
    </Box>)
}

export default SongCardOptions