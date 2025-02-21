import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar, Button, FormControl, Input, TextField } from "@mui/material";
import { patchUser } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase-config";

function UserDetails(){
    const params = useParams()
    const {signedInUser, setSignedInUser} = useContext(UserContext);
    const [username, setUsername] = useState(signedInUser.username);
    const [artist_name, setArtistName] = useState(signedInUser.artist_name);
    const [description, setDescription] = useState(signedInUser.description);
    const [profilePicture, setProfilePicture] = useState(signedInUser.profile_picture);
    const [profilePictureDisplay, setProfilePictureDisplay] = useState(signedInUser.profile_picture);
    const [profilePictureError, setProfilePictureError] = useState("")
    const [patchError, setPatchError] = useState("")
    const navigate = useNavigate()

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

    return (<section>
        <h2>Edit user details</h2>
        <FormControl>
            <Avatar src={profilePictureDisplay}/>
            {profilePictureError ? <p>{profilePictureError}</p> : null}
            <label htmlFor="user-profile-picture-input">Change profile picture</label>
            <Input 
                id="user-profile-picture-input"
                accept="image/*"
                type="file"
                onChange={(event) => {handleAvatarDisplay(event.target.files[0])}}
            />
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

export default UserDetails