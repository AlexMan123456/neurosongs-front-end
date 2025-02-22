import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar, Button, FormControl, Input, TextField } from "@mui/material";
import { getUserById, patchUser } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import Loading from "../../Loading";
import { CloudUpload } from "@mui/icons-material";
import VisuallyHiddenInput from "../../styling/VisuallyHiddenInput";
import FileInput from "../../styling/FileInput";

function UserDetails(){
    const params = useParams()
    const {signedInUser, setSignedInUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [description, setDescription] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureDisplay, setProfilePictureDisplay] = useState(null);

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
    const [isPatchLoading, setIsPatchLoading] = useState(false);

    const [fetchError, setFetchError] = useState("");
    const [profilePictureError, setProfilePictureError] = useState("");
    const [patchError, setPatchError] = useState("");
    const navigate = useNavigate()
    
    useEffect(() => {
        setIsFetchLoading(true);
        getUserById(params.user_id).then((user) => {
            setUsername(user.username);
            setArtistName(user.artist_name);
            setDescription(user.description);
            setProfilePicture(user.profile_picture);
            const profilePictureRef = ref(storage, `${user.user_id}/images/profile-picture/${user.profile_picture}`);
            return getDownloadURL(profilePictureRef);
        }).then((profilePictureURL) => {
            setIsFetchLoading(false);
            setProfilePictureDisplay(profilePictureURL);
        }).catch((err) => {
            console.log(err)
            setIsFetchLoading(false);
            setFetchError("Could not fetch user data. Please try again later.");
        })
    }, [])

    function handleAvatarDisplay(profilePicture){
        setProfilePicture(profilePicture)
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(profilePicture);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (err) => {
                reject(err);
            }
        }).then((dataURL) => {
            setProfilePictureDisplay(dataURL)
        }).catch((err) => {
            setProfilePictureError("Error changing profile picture. Please try again later.")
            setProfilePicture(signedInUser.profile_picture)
            setProfilePictureDisplay(signedInUser.profile_picture)
        })
    }

    function handleSubmit(){
        navigate("/loading");
        const newImageRef = ref(storage, `${signedInUser.user_id}/images/profile-picture/${profilePicture.name}`)
        return uploadBytes(newImageRef, profilePicture).then(() => {
            return patchUser(signedInUser.user_id, {username, artist_name, profile_picture: profilePicture.name, description}).then((user) => {
                setSignedInUser(user);
                navigate(`/users/${user.user_id}`)
            }).catch((err) => {
                navigate(`/users/${user.user_id}/settings`)
                setPatchError("Error updating profile. Please try again later.")
            })
        })
    }

    if(signedInUser.user_id !== params.user_id){
        return (<section>
                <h2>Wrong account!</h2>
                <p>Looks like you're on the wrong edit page...</p>
            </section>)
    }

    if(isFetchLoading){
        return <Loading/>
    }

    if(fetchError){
        return <p>{fetchError}</p>
    }

    return (<section>
        <h2>Edit user details</h2>
        <FormControl>
            {!profilePictureError ? <Avatar src={profilePictureDisplay}/> : <p>{profilePictureError}</p>}
            <FileInput setFile={handleAvatarDisplay}>Change Profile Picture</FileInput>
            <TextField
                label="Username"
                value={username}
                onChange={(event) => {setUsername(event.target.value)}}
            />
            <TextField
                label="Artist Name"
                value={artist_name}
                onChange={(event) => {setArtistName(event.target.value)}}
            />
            <TextField
                multiline
                label="Description"
                value={description}
                onChange={(event) => {setDescription(event.target.value)}}
            />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </FormControl>
    </section>)
}

/*<Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUpload/>}
            >
                Change Profile Picture
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => {handleAvatarDisplay(event.target.files[0])}}
                    multiple
                />
            </Button>*/

export default UserDetails