import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Button, Menu } from "@mui/material";
import { useState } from "react";

function DropdownMenu({children}){
    const [anchorElement, setAnchorElement] = useState(null);
    const isDropdownOpen = !!anchorElement;
    
    return (<Box>
        <Button onClick={(event) => {setAnchorElement(event.currentTarget)}}>
            {isDropdownOpen ? <ArrowDropUp/> : <ArrowDropDown/>}
        </Button>
        <Menu
            anchorEl={anchorElement}
            open={isDropdownOpen}
            onClose={() => {setAnchorElement(null)}}
        >
            {children}
        </Menu>
    </Box>)
}

export default DropdownMenu