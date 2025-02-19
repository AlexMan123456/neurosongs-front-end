import { useEffect, useState } from "react"
import { getSongs } from "../../api";
import SongCard from "./songs/SongCard";

function Homepage(){
    const [featuredSongs, setFeaturedSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getSongs({is_featured: true}).then((songs) => {
            setIsLoading(false);
            setFeaturedSongs(songs);
        }).catch((err) => {
            setIsLoading(false);
            setError("Usually we'd display a list of featured songs, but we're having problems at the moment...");
        })
    }, [])

    return (<section>
        <h2>Welcome to Neurosongs!</h2>
        {isLoading ? <p>Now Loading...</p> : null}
        {error 
        ? 
        <>
            <h2>This is embarassing...</h2>
            <p>{error}</p>
        </>
        : null}
        <h3>Featured Songs</h3>
        {featuredSongs.map((song) => {
            return <SongCard key={`song-card-${song.song_id}`} song={song}/>
        })}
    </section>)
}

export default Homepage