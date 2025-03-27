// I tried implementing a page to let the user set their date of birth with Google signup so that we can verify age.
// However, there were issues with the navigation afterwards as it'd keep redirecting the user back to the verification page after success, when it should navigate back to the root directory.
// This page is not being used as of now, but I may return to this at some point in the future to get it to work again.
// If any open-source contributor would like to try fixing this issue in the meantime, though, this is the page where the user is meant to verify their date of birth.

import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import verifyUserAge from "../../../../utils/verify-user-age";
import { UserContext } from "../../../../contexts/UserContext";
import wait from "../../../../utils/wait";
import SignUpSuccess from "../SignUpSuccess";
import dayjs from "dayjs";
import { postUser } from "../../../../../api";
import AvatarInput from "../../../utility/AvatarInput";
import Loading from "../../../Loading";

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
    const [generalError, setGeneralError] = useState("")
    const navigate = useNavigate();

    function handleSubmit(){
        setIsLoading(true);
        if(!verifyUserAge(new Date(dateOfBirth), 13)){
            setDateOfBirthError("You must be 13 years old or older to create an account on this site.");
            setIsLoading(false);
            return wait(4).then(() => {
                setDateOfBirthError("");
            })
        }
        
        return postUser({
            user_id: firebaseUser.uid,
            artist_name: artistName,
            username,
            email: firebaseUser.email,
            profile_picture: profilePicture?.name ?? "Default",
            date_of_birth: new Date(dateOfBirth.format())
        }).then((user) => {
            setSignedInUser(user);
            setIsSigningInWithGoogle(false);
            return wait(2);
        }).then(() => {
            setIsLoading(false);
            setSignUpSuccess(true);
            return wait(2);
        })
        .then(() => {
            navigate("/");
        })
        .catch((err) => {
            if(err.response?.data?.message === "Unique constraint violation"){
                setUsernameError("There is already another user with this username. Please choose a different username.")
                setIsLoading(false);
                return wait(4).then(() => {
                    setUsernameError("");
                })
            }
            setIsLoading(false);
            setGeneralError("Error finalising your profile. Please try again later.")
        })
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
            <br/>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            {generalError ? <Typography color="error">{generalError}</Typography> : null}
        </FormControl>
    </section>)
}

export default CompleteGoogleSignup