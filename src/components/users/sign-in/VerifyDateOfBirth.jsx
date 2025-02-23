import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import verifyUserAge from "../../../utils/verify-user-age";
import { UserContext } from "../../../contexts/UserContext";
import wait from "../../../utils/wait";
import SignUpSuccess from "./SignUpSuccess";
import dayjs from "dayjs";
import { postUser } from "../../../../api";

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
            searchParams.delete("verify_dob_of_user")
            navigate("/")
        }).catch((err) => {
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