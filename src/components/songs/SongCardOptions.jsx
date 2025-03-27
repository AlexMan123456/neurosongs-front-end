import { Box, MenuItem } from "@mui/material"
import DropdownMenu from "../utility/DropdownMenu"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import DeletePopup from "../utility/DeletePopup";
import Markdown from "react-markdown";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading";
import { deleteSong } from "../../../api";
import { deleteObject, ref } from "@firebase/storage";
import { storage } from "../../firebase-config";
import getSongDirectory from "../../references/get-song-directory";
import wait from "../../utils/wait";

function SongCardOptions({song, setSongs}){
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const {signedInUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    function handleDelete(){
        if(signedInUser.user_id !== song.user_id){
            setError("This isn't even your song!")
            return;
        }
        setIsLoading(true);
        deleteSong(song.song_id).then(() => {
            const songRef = ref(storage, getSongDirectory(song))
            return deleteObject(songRef)
        }).then(() => {
            setSongs((songs) => {
                const newSongs = [...songs];

                const songIndex = newSongs.map((songInMap) => {
                    return songInMap.song_id
                }).indexOf(song.song_id)

                newSongs.splice(songIndex,1);
                return newSongs;
            })
        }).catch((err) => {
            setError("Error deleting song. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
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
            >
                Delete song
            </MenuItem>
        <DeletePopup
            showMessage={showDeleteBackdrop}
            setShowMessage={setShowDeleteBackdrop}
            onDelete={handleDelete}
        >
            <Markdown>
                {`Are you sure you want to delete _${song.title}_?`}
            </Markdown>
        </DeletePopup>
        </DropdownMenu>
        {error ? <p>{error}</p> : null}
    </Box>)
}

export default SongCardOptions