import { useEffect, useState } from "react";
import SongsTable from "./SongsTable";
import SongsList from "./SongsList";
import isScreenLarge from "../../utils/is-screen-large";

function DisplaySongs({songs, setSongs}){
    const [isLargeScreen, setIsLargeScreen] = useState(isScreenLarge(window));

    useEffect(() => {
        function handleResize(){
            setIsLargeScreen(isScreenLarge(window));
        }

        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize)}
    }, [])

    return isLargeScreen ? <SongsTable songs={songs} setSongs={setSongs}/> : <SongsList songs={songs} setSongs={setSongs}/>
}

export default DisplaySongs