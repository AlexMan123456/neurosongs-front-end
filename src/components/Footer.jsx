import { Button, Divider, List, ListItemButton } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

function Footer(){
    const [showFooter, setShowFooter] = useState(true);

    return (<footer>
        <Button onClick={() => {setShowFooter((showFooter) => {return !showFooter})}}>{showFooter ? "Hide" : "Show"} footer</Button>
        <Divider/>
        {showFooter ? <List>
            <li><ListItemButton component={Link} to="https://github.com/AlexMan123456/neurosongs-back-end">GitHub back-end repository</ListItemButton></li>
            <li><ListItemButton component={Link} to="https://github.com/AlexMan123456/neurosongs-front-end">GitHub front-end repository</ListItemButton></li>
        </List> : null}
    </footer>)
}

export default Footer