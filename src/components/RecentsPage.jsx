import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import AllSongs from "./songs/AllSongs";
import AllAlbums from "./albums/AllAlbums";

function RecentsPage(){
    const {category} = useParams();
    const [chosenCategory, setChosenCategory] = useState(category ?? "songs");

    useEffect(() => {
        setChosenCategory(category ?? "songs");
    }, [category])

    return (
        <main>
            <ToggleButtonGroup
                value={chosenCategory}
                exclusive
                aria-label="Choose category"
            >
                <ToggleButton
                    component={Link}
                    to="/recent/songs"
                    value="songs"
                >
                    Songs
                </ToggleButton>
                <ToggleButton
                    component={Link}
                    to="/recent/albums"
                    value="albums"
                >
                    Albums
                </ToggleButton>
            </ToggleButtonGroup>
            <section>
            <h2>Most recent {chosenCategory}</h2>
            {
                {
                    songs: <AllSongs/>,
                    albums: <AllAlbums/>
                }[chosenCategory] ?? <p>The category you're trying to access does not exist</p>
            }
            </section>
        </main>
    )
}

export default RecentsPage