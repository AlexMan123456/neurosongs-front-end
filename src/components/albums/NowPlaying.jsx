import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { getSongById } from "../../../api";
import Loading from "../Loading";
import StyledLink from "../styling/StyledLink";
import { UserContext } from "#contexts/UserContext";

function NowPlaying(){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = searchParams.get("song_id");
    const [songData, setSongData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const {signedInUser} = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true);
        getSongById(song_id, signedInUser.user_id).then((song) => {
            setIsLoading(false);
            setSongData(song);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not get song metadata. Please try again later.")
        })
    }, [song_id])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<>
        <h3>Now Playing</h3>
        <p><StyledLink to={`/songs/${songData.song_id}`}>{songData.title}</StyledLink> - {songData.artist.artist_name}</p>
    </>)
}

export default NowPlaying