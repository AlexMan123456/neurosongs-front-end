import { Button } from "@mui/material"
import { Search, Album } from "@mui/icons-material";
import { Link } from "react-router-dom"

function Navigation() {


    return (

        <>

            <Button
                component={Link}
                to="/featured"
                value="/featured"
                color="text"
            >
                <Album color="secondary" />
                <span style={{ paddingLeft: '10px' }} />
                Featured
            </Button>
            <Button
                component={Link}
                to="/search"
                value="/search"
                color="text"
            >
                <Search color="secondary" />
                <span style={{ paddingLeft: '10px' }} />

                Search
            </Button>
        </>
        // <ToggleButtonGroup
        //     value={location.pathname}
        //     exclusive
        //     aria-label="Choose page"
        // >
        //     <ToggleButton
        //         component={Link}
        //         to="/featured"
        //         value="/featured"
        //     >
        //         Featured
        //     </ToggleButton>
        //     <ToggleButton
        //         component={Link}
        //         to="/search"
        //         value="/search"
        //         >
        //             Search
        //     </ToggleButton>
        // </ToggleButtonGroup>
    )
}

export default Navigation