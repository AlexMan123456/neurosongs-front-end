import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

function Navigation(){
    const location = useLocation();

    return (
        <ToggleButtonGroup
            value={location.pathname}
            exclusive
            aria-label="Choose page"
        >
            <ToggleButton
                component={Link}
                to="/featured"
                value="/featured"
            >
                Featured
            </ToggleButton>
            <ToggleButton
                component={Link}
                to="/search"
                value="/search"
                >
                    Search
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default Navigation