import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { getSongById } from "../../../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase-config";
import H5AudioPlayer from "react-h5-audio-player";
import Loading from "../../Loading";
import { ScreenSizeContext } from "#contexts/ScreenSizeContext";
import { UserContext } from "#contexts/UserContext";

function AlbumSongPlayer({album}){
    const [searchParams, setSearchParams] = useSearchParams();
    const song_id = parseInt(searchParams.get("song_id"));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [songURL, setSongURL] = useState(null);
    const navigate = useNavigate()
    const location = useLocation()
    const {isLargeScreen} = useContext(ScreenSizeContext);
    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        async function loadSong(){
            try {
                setIsLoading(true);
                const songData = await getSongById(song_id, signedInUser.user_id);
                const songRef = ref(storage, `${songData.user_id}/albums/${album.album_id}/songs/${songData.reference}`);
                setIsLoading(false);
                setSongURL(await getDownloadURL(songRef));
            } catch(err) {
                setIsLoading(false);
                setError(error);
            }
        }
        loadSong()
    }, [song_id])


    function nextSong(){
        const songIDs = album.songs.map((song) => {
            return song.song_id;
        })

        const indexOfNextID = songIDs.indexOf(song_id)+1
        if(indexOfNextID >= album.songs.length){
            searchParams.remove("song_id");
            navigate(`${location.pathname}`);
            return;
        }

        const IDOfNextSong = songIDs[indexOfNextID];
        searchParams.set("song_id", IDOfNextSong);
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }

    function previousSong(){
        const songIDs = album.songs.map((song) => {
            return song.song_id;
        })

        const indexOfPreviousID = songIDs.indexOf(song_id)-1
        if(indexOfPreviousID < 0){
            searchParams.set("song_id", songIDs[album.songs.length-1]);
            navigate(`${location.pathname}?${searchParams.toString()}`);
            return;
        }

        const IDOfPreviousSong = songIDs[indexOfPreviousID];
        searchParams.set("song_id", IDOfPreviousSong);
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return <H5AudioPlayer
        style={{width: isLargeScreen ? "90%" : "100%"}}
        src={songURL}
        autoPlay={true} 
        showJumpControls={false}
        showSkipControls={true}
        onClickNext={nextSong}
        onEnded={nextSong}
        onClickPrevious={previousSong}
    />
}

export default AlbumSongPlayer