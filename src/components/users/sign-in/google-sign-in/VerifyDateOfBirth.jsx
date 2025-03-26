// I tried implementing a page to let the user set their date of birth with Google signup so that we can verify age.
// However, there were issues with the navigation afterwards as it'd keep redirecting the user back to the verification page after success, when it should navigate back to the root directory.
// This page is not being used as of now, but I may return to this at some point in the future to get it to work again.
// If any open-source contributor would like to try fixing this issue in the meantime, though, this is the page where the user is meant to verify their date of birth.

import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import verifyUserAge from "../../../../utils/verify-user-age";
import { UserContext } from "../../../../contexts/UserContext";
import wait from "../../../../utils/wait";
import SignUpSuccess from "../SignUpSuccess";
import dayjs from "dayjs";
import { postUser } from "../../../../../api";

function VerifyDateOfBirth({searchParams, user, setIsLoading, setError}){
    const {setSignedInUser} = useContext(UserContext);
    const [dateOfBirth, setDateOfBirth] = useState(dayjs());
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const navigate = useNavigate()

    function handleSubmit(){
        if(!verifyUserAge(new Date(dateOfBirth), 13)){
            setDateOfBirthError("You must be 13 years old or older to create an account on this site.");
            return;
        }
        
        setIsLoading(true);
        return postUser({
            user_id: user.uid,
            artist_name: user.displayName,
            username: user.uid,
            email: user.email,
            date_of_birth: new Date(dateOfBirth.format())
        }).then((user) => {
            setIsLoading(false);
            setSignedInUser(user);
            setSignUpSuccess(true);
            return wait(2);
        }).then(() => {
            return searchParams.delete("verify_dob_of_user")
        }).then(() => {
            navigate("/")
        })
        .catch((err) => {
            setError("Error verifying your date of birth. Please try again later.")
        })
    }

    if(signUpSuccess){
        return <SignUpSuccess signedUpWith={"External authenticator"}/>
    }

    return (<section>
        <h2>Welcome to Neurosongs{user.displayName ? `, ${user.displayName}` : "!"}</h2>
        <p>Please confirm your date of birth</p>
        <DatePicker
            label="Date of birth"
            value={dateOfBirth}
            onChange={(newDateOfBirth) => {setDateOfBirth(newDateOfBirth)}}
        />
        <br/>
        {dateOfBirthError ? <p>{dateOfBirthError}</p> : null}
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </section>)
}

export default VerifyDateOfBirth