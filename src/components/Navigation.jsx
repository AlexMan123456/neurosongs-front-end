import { List, ListItemButton, ToggleButton, ToggleButtonGroup, useScrollTrigger } from "@mui/material"
import StyledLink from "./styling/StyledLink"
import { Link } from "react-router-dom"
import { useState } from "react"

function Navigation(){
    const [page, setPage] = useState("")

    return (
        <ToggleButtonGroup
            value={page}
            onChange={(event) => {setPage(event.target.value)}}
            exclusive
            aria-label="Choose page"
        >
            <ToggleButton
                component={Link}
                to="/featured"
                value="featured"
            >
                Featured
            </ToggleButton>
            <ToggleButton
                component={Link}
                to="/all_songs"
                >
                    All songs
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Navigation