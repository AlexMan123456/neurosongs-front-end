import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from "@mui/material";
import { UserContext } from "../../../../contexts/UserContext";
import SignUpSuccess from "../SignUpSuccess";
import dayjs from "dayjs";
import { postUser } from "../../../../../api";
import AvatarInput from "../../../utility/AvatarInput";
import Loading from "../../../Loading";
import { ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../../../firebase-config";
import getProfilePictureDirectory from "../../../../references/get-profile-picture-directory";
import StyledLink from "../../../styling/StyledLink";
import { formatGoogleDisplayNameAsUsername, verifyUserAge, wait } from "#utils";

function CompleteGoogleSignup(){
    const {setSignedInUser, firebaseUser, setIsSigningInWithGoogle} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [artistName, setArtistName] = useState(firebaseUser.displayName);
    const [username, setUsername] = useState(formatGoogleDisplayNameAsUsername(firebaseUser.displayName));
    const [profilePicture, setProfilePicture] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [generalError, setGeneralError] = useState("");
    const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);
    const [privacyPolicyError, setPrivacyPolicyError] = useState("");
    const [displayUsernameHelperText, setDisplayUsernameHelperText] = useState(false);
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(){
        try {
            setIsLoading(true);
            if(!isPrivacyPolicyAccepted){
                setPrivacyPolicyError("Please accept the privacy policy.");
                setIsLoading(false);
                await wait(4);
                setPrivacyPolicyError("");
                return;
            }
    
            if(!verifyUserAge(new Date(dateOfBirth), 13)){
                setDateOfBirthError("You must be 13 years old or older to create an account on this site.");
                setIsLoading(false);
                await wait(4);
                setDateOfBirthError("");
                return;
            }

            if(username.includes(" ") || username.includes("@")){
                setUsernameError("Username must not contain spaces or @");
                setIsLoading(false);
                await wait(4);
                setUsernameError("");
                return;
            }

            if(profilePicture){
                const profilePictureRef = ref(storage, getProfilePictureDirectory({user_id: firebaseUser.uid, profile_picture: profilePicture.name}))
                await uploadBytes(profilePictureRef, profilePicture);
            }

            const user = await postUser({
                user_id: firebaseUser.uid,
                artist_name: artistName,
                username,
                description,
                email: firebaseUser.email,
                profile_picture: profilePicture?.name ?? "Default",
                date_of_birth: new Date(dateOfBirth.format())
            });
            setSignedInUser(user);
            await wait(2);
            setIsSigningInWithGoogle(false);
            setIsLoading(false);
            setSignUpSuccess(true);
            await wait(2);
            navigate("/");
        } catch (err) {
            setIsPrivacyPolicyAccepted(false);
            if (err.response?.data?.message === "Unique constraint violation") {
                setUsernameError("There is already another user with this username. Please choose a different username.");
                setIsLoading(false);
                return wait(4).then(() => {
                    setUsernameError("");
                });
            }
            setIsLoading(false);
            setGeneralError("Error finalising your profile. Please try again later.");
        }
    }

    if(isLoading){
        return <Loading/>
    }

    if(signUpSuccess){
        return <SignUpSuccess signedUpWith={"External authenticator"}/>
    }

    return (<section>
        <h2>Welcome to Neurosongs{firebaseUser.displayName ? `, ${firebaseUser.displayName}` : "!"}</h2>
        <Typography>Please confirm the following details</Typography>
        <FormControl sx={{paddingTop: "5px"}}>
            <AvatarInput
                file={profilePicture}
                setFile={setProfilePicture}
            >
                Set profile picture    
            </AvatarInput>
            <TextField
                required
                label="Artist name"
                value={artistName}
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
            <DatePicker
                required
                label="Date of birth"
                value={dateOfBirth}
                onChange={(newDateOfBirth) => {setDateOfBirth(newDateOfBirth)}}
            />
            {dateOfBirthError ? <Typography color="error">{dateOfBirthError}</Typography> : null}
            <h3>Optional</h3>
            <Typography>This can be changed later</Typography>
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
            <FormControlLabel 
                control={
                    <Checkbox
                        value={isPrivacyPolicyAccepted}
                        onClick={() => {setIsPrivacyPolicyAccepted((policyAccepted) => {return !policyAccepted})}}
                    />} 
                label={<Typography sx={{paddingTop: "8px"}}>I accept the <StyledLink to="https://neurosongs-privacy.netlify.app/" target="_blank">privacy policy</StyledLink></Typography>}
            />
            {privacyPolicyError ? <Typography color="error">{privacyPolicyError}</Typography> : null}
            <br/>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            {generalError ? <Typography color="error">{generalError}</Typography> : null}
        </FormControl>
    </section>)
}

export default CompleteGoogleSignup