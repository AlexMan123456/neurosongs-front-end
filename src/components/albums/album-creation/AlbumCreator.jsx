import { Button, FormControl, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { postAlbum } from "../../../../api";
import Loading from "../../Loading";
import wait from "../../../utils/wait";
import ForbiddenAccess from "../../errors/ForbiddenAccess";

function AlbumCreator(){
    const {user_id} = useParams()
    const {signedInUser} = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    function handleSubmit(){
        const data = {user_id, title};
        if(description){
            data.description = description;
        }
        setIsLoading(true);
        return postAlbum(data).then((album) => {
            setIsLoading(false);
            //navigate(`${location.pathname}/set_album_covers/${album.album_id}`)
            //navigate(`${location.pathname}/add_songs/${album.album_id}`)
            navigate(`/users/${user_id}`)
        }).catch((err) => {
            setIsLoading(false);
            setError("Error creating album. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(signedInUser.user_id !== user_id){
        return <ForbiddenAccess/>
    }

    if(error){
        return <p>{error}</p>
    }


    return (<section>
        <h2>Create an album</h2>
        <h3>Please enter the following details</h3>
            <FormControl>
                <TextField
                    required
                    label="Title"
                    value={title}
                    onChange={(event) => {setTitle(event.target.value)}}
                />
                <TextField
                    multiline
                    sx={{
                        minWidth: "30vw",
                    }}
                    minRows={5}
                    label="Description"
                    value={description}
                    onChange={(event) => {setDescription(event.target.value)}}
                />
                <Button onClick={handleSubmit}>Next</Button>
            </FormControl>
    </section>)
}

export default AlbumCreator