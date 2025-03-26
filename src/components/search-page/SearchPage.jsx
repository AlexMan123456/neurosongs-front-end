import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import ResultsDisplay from "./ResultsDisplay";

function SearchPage(){
    const {search_for} = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFor, setSearchFor] = useState("songs");
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        setSearchFor(search_for ?? "songs");
    }, [search_for])

    return (<>
        <header>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <Typography>Search for:</Typography>
            <ToggleButtonGroup
                value={searchFor}
                onChange={(event) => {setSearchFor(event.target.value)}}
                exclusive
                aria-label="Search for"
            >
                <ToggleButton
                    component={Link}
                    to="/search/songs"
                    value="songs"
                >
                    Songs
                </ToggleButton>
                <ToggleButton
                    component={Link}
                    to="/search/albums"
                    value="albums"
                >
                    Albums
                </ToggleButton>
                <ToggleButton
                    component={Link}
                    to="/search/users"
                    value="users"
                >
                    Users
                </ToggleButton>
            </ToggleButtonGroup>
        </header>
        <main>
            <ResultsDisplay searchFor={searchFor} searchTriggered={searchTriggered} setSearchQuery={setSearchQuery}/>
        </main>
    </>)
}

export default SearchPage