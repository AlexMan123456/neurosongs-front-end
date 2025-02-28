import { useState } from "react";
import { Backdrop, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { deleteAlbum } from "../../../api";
import wait from "../../utils/wait";
import Loading from "../Loading";

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
        }).catch((err) => {
            setError("Error deleting album. Please try again later.");
            wait(4).then(() => {
                setError("");
            })
        }).finally(() => {
            setIsLoading(false);
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
                <Backdrop
                    open={showDeleteBackdrop}
                    onClick={() => {setShowDeleteBackdrop(false)}}
                >
                    <Box sx={{backgroundColor: "white", borderRadius: 0.7}}>
                        <Typography sx={{paddingLeft: "0.5vw", paddingRight: "0.5vw"}}>Are you sure you want to delete {album.title}?</Typography>
                        <Box sx={{textAlign: "center"}}>
                            <Button onClick={handleDelete} color="success">Yes</Button>
                            <Button onClick={() => {setShowDeleteBackdrop(false)}} color="error">No</Button>
                        </Box>
                    </Box>
                </Backdrop>
            </Menu>
    </Box>)
}

export default AlbumCardOptions