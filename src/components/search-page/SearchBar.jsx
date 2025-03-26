import { Box, Button, FormControl, TextField } from "@mui/material"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"

function SearchBar({searchQuery, setSearchQuery}){
    const navigate = useNavigate();
    const location = useLocation();

    function handleSearch(){
        navigate(`${location.pathname}?search_query=${searchQuery}`)
    }

    function handleEnterKeyPress(event){
        if(event.key === "Enter"){
            handleSearch();
        }
    }

    return (<FormControl>
        <TextField
            value={searchQuery}
            onChange={(event) => {setSearchQuery(event.target.value)}}
            onKeyDown={handleEnterKeyPress}
            label="Search"
        />
        <Button variant="contained" onClick={() => {navigate(`${location.pathname}?search_query=${searchQuery}`)}}>Search</Button>
    </FormControl>)
}

export default SearchBar