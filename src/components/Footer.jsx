import { Button, Divider, List, ListItemButton } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

function Footer(){
    const [showFooter, setShowFooter] = useState(true);

    return (<List>
        <Button onClick={() => {setShowFooter((showFooter) => {return !showFooter})}}>{showFooter ? "Hide" : "Show"} footer</Button>
        <Divider/>
        {showFooter ? <>
            <ListItemButton component={Link} to="https://github.com/AlexMan123456/neurosongs-back-end">GitHub back-end repository</ListItemButton>
            <ListItemButton component={Link} to="https://github.com/AlexMan123456/neurosongs-front-end">GitHub front-end repository</ListItemButton>
        </> : null}
    </List>)
}

export default Footer