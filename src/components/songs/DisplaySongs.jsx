import { useContext } from "react";
import SongsTable from "./SongsTable";
import SongsList from "./SongsList";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";

function DisplaySongs({songs, setSongs}){
    const {isLargeScreen} = useContext(ScreenSizeContext);
    return isLargeScreen ? <SongsTable songs={songs} setSongs={setSongs}/> : <SongsList songs={songs} setSongs={setSongs}/>
}

export default DisplaySongs