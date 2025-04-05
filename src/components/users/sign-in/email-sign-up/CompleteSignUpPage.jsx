import { isSignInWithEmailLink, signInWithCredential, signInWithEmailAndPassword, signInWithEmailLink, signOut, updatePassword } from "firebase/auth"
import { auth, storage } from "../../../../firebase-config"
import { useContext, useEffect, useState } from "react";
import Loading from "../../../Loading";
import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, List, ListItemText, Stack, TextField, Typography } from "@mui/material";
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
import getProfilePictureDirectory from "../../../../references/get-profile-picture-directory";
import StyledLink from "../../../styling/StyledLink";
import { UserContext } from "../../../../contexts/UserContext";

function CompleteSignUpPage(){
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [displayForm, setDisplayForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formLoadError, setFormLoadError] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [description, setDescription] = useState("");
    const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);
    const [privacyPolicyError, setPrivacyPolicyError] = useState("");

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
            signInWithEmailLink(auth, email, window.location.href).then(({user}) => {
                setFirebaseUser(user)
                setIsLoading(false);
                setDisplayForm(true);
            }).catch((err) => {
                return signOut(auth).then(() => {
                    setIsLoading(false);
                    setFormLoadError("Could not sign you in. Please try again later.");
                })
            })
        }
    }, [])

    function handleAvatarDisplay(incomingFile){
        setIsProfilePictureLoading(true);
        const previousProfilePicture = profilePicture;
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
            setProfilePicture(incomingFile);
            setIsProfilePictureLoading(false);
            setProfilePictureDisplay(profilePictureURL);
        }).catch((err) => {
            setIsProfilePictureLoading(false);
            setProfilePictureError("Error changing profile picture. Please try again later.");
            setProfilePicture(previousProfilePicture);
            setProfilePictureDisplay(previousProfilePicture);
        })
    }

    async function handleSubmit(){
        setIsLoading(true);
        setUsernameError("");
        setPasswordError("");
        setDateOfBirthError("");
        setPrivacyPolicyError("");

        if(!isPrivacyPolicyAccepted){
            setPrivacyPolicyError("Please accept the privacy policy.");
            setIsLoading(false);
            await wait(4);
            setPrivacyPolicyError("");
        }

        if(username.includes(" ") || username.includes("@")){
            setIsLoading(false);
            setUsernameError("Username must not contain spaces or @");
            await wait(4);
            setUsernameError("");
        }

        if(!verifyUserAge(new Date(dateOfBirth.format()), 13)){
            setIsLoading(false);
            setDateOfBirthError("You must be 13 years old or older to create an account on this site.");
            await wait(4);
            setDateOfBirthError("");
        }

        if(password !== confirmPassword){
            setIsLoading(false);
            setConfirmPasswordError("Passwords do not match. Please try again.");
            await wait(4);
            setConfirmPasswordError("");
        }

        try {
            await updatePassword(firebaseUser, password);
            const signedInFirebaseUser = await signInWithEmailAndPassword(auth, firebaseUser.email, password);
            setFirebaseUser(signedInFirebaseUser);
            const data = {
                user_id: firebaseUser.uid,
                username,
                artist_name,
                description,
                email: firebaseUser.email,
                date_of_birth: new Date(dateOfBirth.format())
            }
            if(profilePicture){
                const profilePictureRef = ref(storage, getProfilePictureDirectory({ user_id: firebaseUser.uid, profile_picture: profilePicture.name }));
                await uploadBytes(profilePictureRef, profilePicture);
                data.profile_picture = profilePicture.name;
            }
            await postUser(data);
            await signOut(auth);
            setIsLoading(false);
            setSignUpSuccess(true);
            localStorage.removeItem("email");
            await wait(2);
            navigate("/sign_in");
        } catch (error) {
            console.log(error);
            if (error.response?.data?.message === "Unique constraint violation") {
                setUsernameError("There is already another user with this username. Please choose a different username.");
                return;
            }
            setPasswordError(error);
            setIsPrivacyPolicyAccepted(false);
            setIsLoading(false);
        }
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
        <Stack spacing={1}>
            {isProfilePictureLoading ? <Loading/> : (!profilePictureError ? <Avatar src={profilePictureDisplay}/> : <p>{profilePictureError}</p>)}
            <FileInput onChange={handleAvatarDisplay} accept="image/*">Set Profile Picture</FileInput>
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
            {usernameError ? <Typography color="error">{usernameError}</Typography> : null}
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
            {passwordError.code === "auth/password-does-not-meet-requirements" ? <>
                <Typography color="error">Your password does not match the following criteria:</Typography>
                <List color="error">
                    {getMissingPasswordRequirements(passwordError.message).map((requirement, index) => {
                        return <ListItemText sx={{color: "red"}} key={`requirement-${index}`}>{requirement}</ListItemText>
                    })}
                </List>
            </> : null}
            {confirmPasswordError ? <Typography color="error">{confirmPasswordError}</Typography> : null}
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
                required
                label="Date of birth"
                value={dateOfBirth}
                onChange={(newDateOfBirth) => {setDateOfBirth(newDateOfBirth)}}
                />
            {dateOfBirthError ? <Typography color="error">{dateOfBirthError}</Typography> : null}
            <br/>
            <h3>Optional</h3>
            <p>This can be changed later</p>
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
            <FormGroup>
            <FormControlLabel 
                control={
                    <Checkbox
                    value={isPrivacyPolicyAccepted}
                    onClick={() => {setIsPrivacyPolicyAccepted((policyAccepted) => {return !policyAccepted})}}
                    />} 
                    label={<Typography sx={{paddingTop: "8px"}}>I accept the <StyledLink to="https://neurosongs-privacy.netlify.app/" target="_blank">privacy policy</StyledLink></Typography>}
                    />
            {privacyPolicyError ? <Typography sx={{paddingTop: "8px"}} color="error">{privacyPolicyError}</Typography> : null}
            </FormGroup>
        </Stack>
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </>)
}

export default CompleteSignUpPage