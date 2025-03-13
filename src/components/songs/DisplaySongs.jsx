import { useEffect, useState } from "react";
import SongsTable from "./SongsTable";
import SongsList from "./SongsList";

function DisplaySongs({songs, setSongs}){
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 495 && window.innerHeight > 800);

    useEffect(() => {
        function handleResize(){
            setIsLargeScreen(window.innerWidth > 495 && window.innerHeight > 800);
        }

        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize)}
    }, [])

    return isLargeScreen ? <SongsTable songs={songs} setSongs={setSongs}/> : <SongsList songs={songs} setSongs={setSongs}/>
}

export default DisplaySongs