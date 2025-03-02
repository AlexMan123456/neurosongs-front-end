import { useEffect, useState } from "react"
import { getAlbums, getSongs } from "../../api";
import SongCard from "./songs/SongCard";
import AlbumCard from "./albums/AlbumCard";
import Loading from "./Loading";
import { List } from "@mui/material";
import SongsTable from "./songs/SongsTable";

function FeaturedPage(){
    const [featuredSongs, setFeaturedSongs] = useState([]);
    const [featuredAlbums, setFeaturedAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getSongs({is_featured: true}).then((songs) => {
            setFeaturedSongs(songs);
            return getAlbums({is_featured: true});
        }).then((albums) => {
            setIsLoading(false);
            setFeaturedAlbums(albums);
        }).catch((err) => {
            setIsLoading(false);
            setError("Usually we'd display a list of featured songs, but we're having problems at the moment...");
        })
    }, [])

    return (<section>
        <h2>Featured Content</h2>
        {error ? <p>{error}</p> :
        <>
            <h3>Featured Albums</h3>
            {isLoading ? <Loading/> : 
            <List 
                sx={{
                    width: "100%",
                    display: "inline-block"
              }}
            >
                {featuredAlbums.map((album) => {
                    return <AlbumCard key={`album-card-${album.album_id}`} album={album}/>
                })}
            </List>}
            <h3>Featured Songs</h3>
            {isLoading ? <Loading/> : <SongsTable songs={featuredSongs}/>}
        </>}
    </section>)
}

export default FeaturedPage