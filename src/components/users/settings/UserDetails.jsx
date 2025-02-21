import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar, Button, FormControl, Input, TextField } from "@mui/material";

function UserDetails(){
    const {signedInUser} = useContext(UserContext);
    const [username, setUsername] = useState(signedInUser.username);
    const [artistName, setArtistName] = useState(signedInUser.artist_name);
    const [description, setDescription] = useState(signedInUser.description);
    const [profilePicture, setProfilePicture] = useState(signedInUser.profile_picture);
    const [profilePictureDisplay, setProfilePictureDisplay] = useState(signedInUser.profile_picture);
    const [profilePictureError, setProfilePictureError] = useState("")

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
                value={artistName}
                onChange={(event) => {setArtistName(event.target.value)}}
            />
            <TextField
                multiline
                label="Description"
                value={description}
                onChange={(event) => {setDescription(event.target.value)}}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
    </section>)
}

export default UserDetails