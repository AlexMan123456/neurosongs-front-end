import { useState } from "react";
import { Backdrop, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { deleteAlbum } from "../../../api";
import wait from "../../utils/wait";
import Loading from "../Loading";
import DeletePopup from "../utility/DeletePopup";
import Markdown from "react-markdown";

function AlbumCardOptions({album, setAlbums}){
    const [anchorElement, setAnchorElement] = useState(null);
    const [showDeleteBackdrop, setShowDeleteBackdrop] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const isDropdownOpen = !!anchorElement;

    function handleDelete(){
        setIsLoading(true);
        deleteAlbum(album.album_id).then(() => {
            setAlbums((albums) => {
                const newAlbums = [...albums];
                
                const albumIndex = newAlbums.map((albumInMap) => {
                    return albumInMap.album_id
                }).indexOf(album.album_id)

                newAlbums.splice(albumIndex, 1);
                return newAlbums;
            })
            setIsLoading(false);
        }).catch((err) => {
            setError("Error deleting album. Please try again later.");
            setIsLoading(false);
            wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (<Box>
        <Button onClick={(event) => {setAnchorElement(event.currentTarget)}}>
            {isDropdownOpen ? <ArrowDropUp/> : <ArrowDropDown/>}
        </Button>
        <Menu
            anchorEl={anchorElement}
            open={isDropdownOpen}
            onClose={() => {setAnchorElement(null)}}
        >
            <MenuItem
                component={Link}
                to={`/albums/${album.album_id}/edit`}
            >
                Edit album
            </MenuItem>
            <MenuItem
                onClick={() => {setShowDeleteBackdrop(true)}}
            >
                Delete album
            </MenuItem>
            <DeletePopup
                showMessage={showDeleteBackdrop}
                setShowMessage={setShowDeleteBackdrop}
                onDelete={handleDelete}
            >
                <Markdown>{`Are you sure you want to delete ${album.title}?`}</Markdown>
            </DeletePopup>
            {error ? <Typography color="error">{error}</Typography> : null}
        </Menu>
    </Box>)
}

export default AlbumCardOptions