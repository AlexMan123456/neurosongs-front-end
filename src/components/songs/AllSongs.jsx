import { useEffect, useState } from "react";
import SongsTable from "./SongsTable";
import { getSongs } from "../../../api";
import Loading from "../Loading";

function AllSongs(){
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getSongs().then((songs) => {
            setIsLoading(false);
            setSongs(songs);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch songs. Please try again later.");
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>Most recent songs</h2>
        <p>Search feature coming soon!</p>
        <SongsTable songs={songs}/>
    </section>)
}

export default AllSongs