import { isSignInWithEmailLink, signInWithEmailLink, signOut, updatePassword } from "firebase/auth"
import { auth, storage } from "../../../../firebase-config"
import { useEffect, useState } from "react";
import Loading from "../../../Loading";
import { Avatar, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getMissingPasswordRequirements from "../../../../utils/get-missing-password-requirements";
import { postUser } from "../../../../../api";
import FileInput from "../../../styling/FileInput";
import { ref, uploadBytes } from "firebase/storage";
import SignUpSuccess from "../SignUpSuccess";
import wait from "../../../../utils/wait";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import verifyUserAge from "../../../../utils/verify-user-age";
import getProfilePictureDirectory from "../../../../utils/get-profile-picture-directory";

function CompleteSignUpPage(){
    const [displayForm, setDisplayForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formLoadError, setFormLoadError] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [username, setUsername] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [description, setDescription] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [displayConfirmPasswordHelperText, setDisplayConfirmPasswordHelperText] = useState(false);
    
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [displayUsernameHelperText, setDisplayUsernameHelperText] = useState(false);
    const [displayPasswordRequirements, setDisplayPasswordRequirements] = useState(false);
    
    const [dateOfBirthError, setDateOfBirthError] = useState("")

    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
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
        setUsernameError("");
        setPasswordError("");
        setDateOfBirthError("");
        const user = auth.currentUser
        if(username.includes(" ") || username.includes("@")){
            setIsLoading(false);
            setUsernameError("Username must not contain spaces or @");
            return;
        }

        if(!verifyUserAge(new Date(dateOfBirth.format()), 13)){
            setIsLoading(false);
            setDateOfBirthError("You must be 13 years old or older to create an account on this site.");
            return;
        }

        if(password !== confirmPassword){
            setIsLoading(false);
            setConfirmPasswordError("Passwords do not match. Please try again.");
            return;
        }

        return updatePassword(user, password).then(() => {
            return postUser({
                user_id: user.uid,
                username,
                artist_name,
                description,
                profile_picture: profilePicture.name,
                email: user.email,
                date_of_birth: new Date(dateOfBirth.format())
            })
        }).then(() => {
            const profilePictureRef = ref(storage, getProfilePictureDirectory({user_id: user.uid, profile_picture: profilePicture.name}))
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
            setIsLoading(false);
            if(err.response){
                if(err.response.data){
                    if(err.response.data.message === "Unique constraint violation"){
                        setUsernameError("There is already another user with this username. Please choose a different username.");
                        return;
                    }
                }
            }
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
        return <SignUpSuccess signedUpWith={"email"}/>
    }

    if(!displayForm){
        return (<>
            <h2>You're not supposed to be here!</h2>
            <p>Only the recipient of the initial verification email should be able to access this page.</p>
        </>)
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
            onFocus={() => {setDisplayPasswordRequirements(true)}}
            onBlur={() => {setDisplayPasswordRequirements(false)}}
        />
        {displayPasswordRequirements ? 
        <FormHelperText>
            <p>NOTE: Your password must meet the following criteria:</p>
            <ul>
                <li>Password must contain at least 10 characters</li>
                <li>Password must contain an upper case character</li>
                <li>Password must contain a numeric character</li>
                <li>Password must contain a non-alphanumeric character</li>
            </ul>
        </FormHelperText>
        : null}
        <TextField
            required
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => {setConfirmPassword(event.target.value)}}
            onFocus={() => {setDisplayConfirmPasswordHelperText(true)}}  
            onBlur={() => {setDisplayConfirmPasswordHelperText(false)}}
        />
        {displayConfirmPasswordHelperText ? <FormHelperText>Enter your password again to confirm.</FormHelperText> : null}
        <DatePicker
            label="Date of birth"
            value={dateOfBirth}
            onChange={(newDateOfBirth) => {setDateOfBirth(newDateOfBirth)}}
        />
        {passwordError || confirmPasswordError || usernameError || dateOfBirthError ? <h3>Error creating your account. Please address the following.</h3> : null}
        {passwordError.code === "auth/password-does-not-meet-requirements" ? <>
            <p>Your password does not match the following criteria:</p>
            <ul>
                {getMissingPasswordRequirements(passwordError.message).map((requirement, index) => {
                    return <li key={`requirement-${index}`}>{requirement}</li>
                })}
            </ul>
        </> : null}
        {confirmPasswordError ? <p>{confirmPasswordError}</p> : null}
        {usernameError ? <p>{usernameError}</p> : null}
        {dateOfBirthError ? <p>{dateOfBirthError}</p> : null}
        <h3>Optional</h3>
        <p>This can be changed later</p>
        <TextField
            multiline
            label="Description"
            value={description}
            onChange={(event) => {setDescription(event.target.value)}}
        />
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </>)
}

export default CompleteSignUpPage