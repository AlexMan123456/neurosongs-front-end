import { Box, MenuItem } from "@mui/material"
import DropdownMenu from "../utility/DropdownMenu"
import { Link } from "react-router-dom"

function SongCardOptions({song}){
    return (<Box>
        <DropdownMenu>
            <MenuItem
                component={Link}
                to={`/songs/${song.song_id}/edit`}
            >
                Edit song
            </MenuItem>
        </DropdownMenu>
    </Box>)
}

export default SongCardOptions