import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useEffect, useState } from "react"
import UserSongs from "./UserSongs"
import { Link, useParams } from "react-router-dom"
import UserAlbums from "./UserAlbums"
import UserDescription from "./UserDescription"

function DisplayCategory(){
    const {user_id, category} = useParams();
    const [chosenCategory, setChosenCategory] = useState(category ?? "songs")

    useEffect(() => {
        setChosenCategory(category ?? "songs");
    }, [category])

    return (<section>
        <ToggleButtonGroup
            value={chosenCategory}
            exclusive
            aria-label="Choose category"
        >
            <ToggleButton
                component={Link}
                to={`/users/${user_id}/songs`}
                value="songs"
            >
                Songs
            </ToggleButton>
            <ToggleButton
                component={Link}
                to={`/users/${user_id}/albums`}
                value="albums"
            >
                Albums
            </ToggleButton>
            <ToggleButton
                component={Link}
                to={`/users/${user_id}/description`}
                value="description"
            >
                Description
            </ToggleButton>
        </ToggleButtonGroup>
        {
            {
                songs: <UserSongs/>, 
                albums: <UserAlbums/>,
                description: <UserDescription/>
            }[chosenCategory] ?? (
                <section>
                    <h2>Category not found</h2>
                    <p>The category you're trying to access does not exist</p>
                </section>
            )
        }
    </section>)
}

export default DisplayCategory