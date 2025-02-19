import { useEffect, useState } from "react"
import { getSongs } from "../../api";
import SongCard from "./songs/SongCard";

function Homepage(){
    const [featuredSongs, setFeaturedSongs] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        getSongs({is_featured: true}).then((songs) => {
            setFeaturedSongs(songs);
        }).catch((err) => {
            setError("Usually we'd display a list of featured songs, but we're having problems at the moment...");
        })
    }, [])

    return (<section>
        <h2>Welcome to Neurosongs!</h2>
        {error ? <p>{error}</p> : 
        <>
            <h3>Featured Songs</h3>
            <ol>
                {featuredSongs.map((song) => {
                    return (<SongCard song={song}/>)
                })}
            </ol>
        </>}
    </section>)
}

export default Homepage