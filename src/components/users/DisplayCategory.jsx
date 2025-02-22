import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"
import UserSongs from "./UserSongs"
import { useParams } from "react-router-dom"
import UserAlbums from "./UserAlbums"

function DisplayCategory(){
    const {user_id} = useParams()
    const [category, setCategory] = useState("songs")
    return (<section>
        <ToggleButtonGroup
            value={category}
            exclusive
            onChange={(event) => {setCategory(event.target.value)}}
            aria-label="Choose category"
        >
            <ToggleButton value="songs">Songs</ToggleButton>
            <ToggleButton value="albums">Albums</ToggleButton>
        </ToggleButtonGroup>
        {
            {
                songs: <UserSongs user_id={user_id}/>, 
                albums: <UserAlbums user_id={user_id}/>
            }[category]
        }
    </section>)
}

export default DisplayCategory