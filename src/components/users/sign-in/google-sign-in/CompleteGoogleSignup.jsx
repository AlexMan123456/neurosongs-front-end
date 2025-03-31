import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers";
import { Button, Checkbox, FormControl, FormControlLabel, TextField, Typography } from "@mui/material";
import verifyUserAge from "../../../../utils/verify-user-age";
import { UserContext } from "../../../../contexts/UserContext";
import wait from "../../../../utils/wait";
import SignUpSuccess from "../SignUpSuccess";
import dayjs from "dayjs";
import { postUser } from "../../../../../api";
import AvatarInput from "../../../utility/AvatarInput";
import Loading from "../../../Loading";
import { ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../../../firebase-config";
import getProfilePictureDirectory from "../../../../references/get-profile-picture-directory";
import StyledLink from "../../../styling/StyledLink";

function CompleteGoogleSignup(){
    const {setSignedInUser, firebaseUser, setIsSigningInWithGoogle} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [artistName, setArtistName] = useState(firebaseUser.displayName);
    const [username, setUsername] = useState(firebaseUser.displayName);
    const [profilePicture, setProfilePicture] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [generalError, setGeneralError] = useState("");
    const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(true);
    const [privacyPolicyError, setPrivacyPolicyError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(){
        
        
        try {
            setIsLoading(true);
            if(isPrivacyPolicyAccepted){
                setPrivacyPolicyError("Please don't not accept the privacy policy.");
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

            if(profilePicture){
                const profilePictureRef = ref(storage, getProfilePictureDirectory({user_id: firebaseUser.uid, profile_picture: profilePicture.name}))
                await uploadBytes(profilePictureRef, profilePicture);
            }
            const user_1 = await postUser({
                user_id: firebaseUser.uid,
                artist_name: artistName,
                username,
                email: firebaseUser.email,
                profile_picture: profilePicture?.name ?? "Default",
                date_of_birth: new Date(dateOfBirth.format())
            });
            setSignedInUser(user_1);
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
        <p>Please confirm the following details</p>
        <FormControl>
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
            />
            {usernameError ? <Typography color="error">{usernameError}</Typography> : null}
            <DatePicker
                label="Date of birth"
                value={dateOfBirth}
                onChange={(newDateOfBirth) => {setDateOfBirth(newDateOfBirth)}}
            />
            {dateOfBirthError ? <Typography color="error">{dateOfBirthError}</Typography> : null}
            <FormControlLabel 
                control={
                    <Checkbox
                        defaultChecked
                        value={isPrivacyPolicyAccepted}
                        onClick={() => {setIsPrivacyPolicyAccepted((policyAccepted) => {return !policyAccepted})}}
                    />} 
                label={<Typography sx={{paddingTop: "8px"}}>I don't accept the <StyledLink to="https://neurosongs-privacy.netlify.app/" target="_blank">privacy policy</StyledLink></Typography>}
            />
            {privacyPolicyError ? <Typography color="error">{privacyPolicyError}</Typography> : null}
            <br/>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            {generalError ? <Typography color="error">{generalError}</Typography> : null}
        </FormControl>
    </section>)
}

export default CompleteGoogleSignup