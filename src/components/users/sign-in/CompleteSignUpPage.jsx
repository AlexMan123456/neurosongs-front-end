import { isSignInWithEmailLink, signInWithEmailLink, signOut, updatePassword } from "firebase/auth"
import { auth, storage } from "../../../firebase-config"
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { Avatar, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getMissingPasswordRequirements from "../../../utils/get-missing-password-requirements";
import { postUser } from "../../../../api";
import FileInput from "../../styling/FileInput";
import { ref, uploadBytes } from "firebase/storage";
import SignUpSuccess from "./SignUpSuccess";
import wait from "../../../utils/wait";

function CompleteSignUpPage(){
    const [displayForm, setDisplayForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formLoadError, setFormLoadError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [displayUsernameHelperText, setDisplayUsernameHelperText] = useState(false);

    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [profilePictureDisplay, setProfilePictureDisplay] = useState(null);
    const [profilePictureError, setProfilePictureError] = useState("");

    const [signUpSuccess, setSignUpSuccess] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(isSignInWithEmailLink(auth, window.location.href)){
            const email = localStorage.getItem("email") ?? window.prompt('Please provide your email for confirmation');
            setIsLoading(true);
            signInWithEmailLink(auth, email, window.location.href).then((result) => {
                setIsLoading(false);
                setDisplayForm(true);
            }).catch((err) => {
                setIsLoading(false);
                setFormLoadError("Could not sign you in. Please try again later.");
            })
        }
    }, [])

    function handleAvatarDisplay(incomingFile){
        setIsProfilePictureLoading(true);
        const previousProfilePicture = profilePicture;
        setProfilePicture(incomingFile);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(incomingFile);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (err) => {
                reject(err);
            }
        }).then((profilePictureURL) => {
            setIsProfilePictureLoading(false);
            setProfilePictureDisplay(profilePictureURL);
        }).catch((err) => {
            setIsProfilePictureLoading(false);
            setProfilePictureError("Error changing profile picture. Please try again later.");
            setProfilePicture(previousProfilePicture);
            setProfilePictureDisplay(previousProfilePicture);
        })
    }

    function handleSubmit(){
        setIsLoading(true);
        const user = auth.currentUser
        if(username.includes(" ") || username.includes("@")){
            setUsernameError("Username must not contain spaces or @")
            return;
        }

        return updatePassword(user, password).then(() => {
            return postUser({
                user_id: user.uid,
                username,
                artist_name,
                description,
                profile_picture: profilePicture.name,
                email: user.email
            })
        }).then(() => {
            const profilePictureRef = ref(storage, `${user.uid}/images/profile-picture/${profilePicture.name}`)
            return uploadBytes(profilePictureRef, profilePicture)
        }).then(() => {
            return signOut(auth);
        }).then(() => {
            setIsLoading(false);
            setSignUpSuccess(true);
            return Promise.resolve();
        }).then(() => {
            return wait(2);
        }).then(() => {
            navigate("/sign_in");
        })
        .catch((err) => {
            setPasswordError(err);
        })
    }


    if(isLoading){
        return <Loading/>
    }

    if(formLoadError){
        return <p>{formLoadError}</p>
    }

    if(signUpSuccess){
        return <SignUpSuccess/>
    }

    return (<>
    <h2>Please enter the following details</h2>
    <FormControl>
        {isProfilePictureLoading ? <Loading/> : (!profilePictureError ? <Avatar src={profilePictureDisplay}/> : <p>{profilePictureError}</p>)}
        <FileInput setFile={handleAvatarDisplay}>Set Profile Picture</FileInput>
        <TextField
            required
            label="Artist name"
            value={artist_name}
            onChange={(event) => {setArtistName(event.target.value)}}
        />
        <TextField
            required
            label="Username"
            value={username}
            onChange={(event) => {setUsername(event.target.value)}}
            onFocus={() => {setDisplayUsernameHelperText(true)}}
            onBlur={() => {setDisplayUsernameHelperText(false)}}
        />
        {displayUsernameHelperText ? <FormHelperText>NOTE: Your username must be unique and not contain spaces or @ sign</FormHelperText> : null}
        <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
        />
        {passwordError || usernameError ? <h3>Error creating your account. Please address the following.</h3> : null}
        {passwordError.code === "auth/password-does-not-meet-requirements" ? <>
            <p>Your password does not match the following criteria:</p>
            <ul>
                {getMissingPasswordRequirements(passwordError.message).map((requirement, index) => {
                    return <li key={`requirement-${index}`}>{requirement}</li>
                })}
            </ul>
        </> : null}
        <h3>Optional</h3>
        <p>This can be changed later</p>
        <TextField
            multiline
            label="Description"
            value={description}
            onChange={(event) => {setDescription(event.target.value)}}
        />
        {usernameError ? <p>{usernameError}</p> : null}
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </>)
}

export default CompleteSignUpPage