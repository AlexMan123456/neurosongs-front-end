import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar, Button, FormControl, TextField } from "@mui/material";
import { getUserById, patchUser } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";
import Loading from "../../Loading";
import FileInput from "../../styling/FileInput";
import wait from "../../../utils/wait";
import getProfilePictureDirectory from "../../../utils/get-profile-picture-directory";

function UserDisplayInfoEditPage(){
    const params = useParams()
    const {signedInUser, setSignedInUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [description, setDescription] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureDisplay, setProfilePictureDisplay] = useState(null);

    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);

    const [fetchError, setFetchError] = useState("");
    const [profilePictureError, setProfilePictureError] = useState("");
    const [isPatchLoading, setIsPatchLoading] = useState(false);
    const [patchError, setPatchError] = useState("");
    const navigate = useNavigate()
    
    useEffect(() => {
        setIsFetchLoading(true);
        getUserById(params.user_id).then((user) => {
            setUsername(user.username);
            setArtistName(user.artist_name);
            setDescription(user.description);
            setProfilePicture(user.profile_picture);
            const profilePictureRef = ref(storage, getProfilePictureDirectory(user));
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

    function handleAvatarDisplay(file){
        setIsProfilePictureLoading(true);
        const previousProfilePicture = profilePicture
        setProfilePicture(file)
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (err) => {
                reject(err);
            }
        }).then((dataURL) => {
            setIsProfilePictureLoading(false);
            setProfilePictureDisplay(dataURL);
        }).catch((err) => {
            setIsProfilePictureLoading(false);
            setProfilePictureError("Error changing profile picture. Please try again later.");
            setProfilePicture(previousProfilePicture);
            setProfilePictureDisplay(previousProfilePicture);
        })
    }

    function handleSubmit(){
        setIsPatchLoading(true);
        return wait(2).then(() => {
            const newImageRef = ref(storage, getProfilePictureDirectory({user_id: params.user_id, profile_picture: profilePicture.name}));
            return uploadBytes(newImageRef, profilePicture)
        }).then(() => {
            return patchUser(params.user_id, {username, artist_name, profile_picture: profilePicture.name, description})
        }).then((user) => {
            setIsPatchLoading(false);
            setSignedInUser(user);
            navigate(`/`)
        }).catch((err) => {
            setIsPatchLoading(false);
            setPatchError("Error updating profile. Please try again later.");
        })
    }

    if(signedInUser.user_id !== params.user_id){
        return (<section>
                <h2>Wrong account!</h2>
                <p>Looks like you're on the wrong edit page...</p>
            </section>)
    }

    if(isFetchLoading || isPatchLoading){
        return <Loading/>
    }

    if(fetchError){
        return <p>{fetchError}</p>
    }

    if(patchError){
        return <p>{patchError}</p>
    }

    return (<section>
        <h2>Edit user details</h2>
        <FormControl>
            {isProfilePictureLoading ? <Loading/> : (!profilePictureError ? <Avatar src={profilePictureDisplay}/> : <p>{profilePictureError}</p>)}
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

export default UserDisplayInfoEditPage