import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function DropdownToggle(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleDropdown(){
        setIsDropdownOpen((isDropdownOpen) => {
            return !isDropdownOpen
        })
    }

    return (<Button onClick={handleDropdown}>
        {isDropdownOpen ? <ArrowDropUp/> : <ArrowDropDown/>}
    </Button>)
}

export default DropdownToggle