// SCRAPPED FOR NOW: The original plan was that right after creating an album, you'd be redirected to a song adder page where you'd be able to set the amount of songs
// you want to add to your album, then add the songs.
// However, this feature turned out to be very difficult due to all the state management involved, and so it's being cut from early release, at least.
// This can be brought back in a future version once I've had some time to think more about it, or if anyone wants to have a go at implementing this and send a pull request.

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext";
import { getAlbumById, postSong } from "../../../../api";
import Loading from "../../Loading";
import { Button, FormControl, Input, List, Typography } from "@mui/material";
import AlbumSongAdder from "./AlbumSongAdder";
import wait from "../../../utils/wait";
import ForbiddenAccess from "../../errors/ForbiddenAccess";

function AlbumSongAdderPage(){
    const {user_id, album_id} = useParams();
    const {signedInUser} = useContext(UserContext);
    const [album, setAlbum] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [numberOfSongs, setNumberOfSongs] = useState(1)
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(album_id).then((album) => {
            setIsLoading(false);
            setAlbum(album);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error getting album data. Please try again later.")
            return wait(4).then(() => {
                setError("")
            })
        })
    }, [])

    useEffect(() => {
        setSongs((songs) => {
            if(songs.length === 0){
                return new Array(numberOfSongs).fill({title: "", description: "", reference: ""});
            }
            const newSongs = [...songs];
            newSongs.length = numberOfSongs;
            return newSongs;
        })
    }, [numberOfSongs])

    async function handleSubmit(){
        try {
            setIsLoading(true)
            for(const song of songs){
                await postSong(album_id, {
                    title: song.title});
            }
        } catch(err) {
            setIsLoading(false);
            setError("Error posting song. Please try again later.");
            await wait(4);
            setError("");
        }
    }

    function handleArraySize(event){
        setNumberOfSongs(event.target.value)
    }


    if(signedInUser.user_id !== user_id){
        return <ForbiddenAccess/>
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>Add some songs to {album.title}</h2>
        <FormControl>
            <Typography>Number of songs:</Typography>
            <Input
                required
                value={numberOfSongs}
                onChange={handleArraySize}
                type="number"
                inputProps={{
                    step: 1,
                    min: 1,
                    type: 'number',
                    "aria-labelledby": "rating-slider"
                }}
            />
        </FormControl>
        <List>
            {songs.map((song, index) => {
                return (<AlbumSongAdder
                    key={`song-adder-${index}`}
                    index={index}
                    song={song}
                    onTitleChange={(event) => {
                        setSongs((songs) => {
                            const newSongs = [...songs];
                            newSongs[index].title = event.target.value;
                            return newSongs;
                        })
                    }}
                    onDescriptionChange={(event) => {
                        setSongs((songs) => {
                            const newSongs = [...songs];
                            newSongs[index].description = event.target.value;
                            return newSongs;
                        })
                    }}
                />)
            })}
        </List>
        <Button onClick={handleSubmit}>Submit</Button>
    </section>)
}

export default AlbumSongAdderPage