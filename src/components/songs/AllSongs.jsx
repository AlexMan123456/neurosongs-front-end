import { useEffect, useState } from "react";
import SongsTable from "./SongsTable";
import { getSongs } from "../../../api";
import Loading from "../Loading";
import DisplaySongs from "./DisplaySongs";

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
        <DisplaySongs songs={songs}/>
    </section>)
}

export default AllSongs