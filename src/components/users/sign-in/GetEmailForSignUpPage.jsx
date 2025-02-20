import { Button, FormControl, FormHelperText, TextField } from "@mui/material"
import { sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../../firebase-config";
import Loading from "../../Loading";

function GetEmailForSignUpPage(){
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const actionCodeSettings = {
        url: `${import.meta.env.VITE_BASE_URL}/complete_signup`,
        handleCodeInApp: true
    }

    function handleSubmit(event){
        sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
            localStorage.setItem("email", email);
            setEmailSent(true);
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    if(emailSent){
        return (<section>
            <h2>An verification email has been sent to {email}</h2>
            <p>Please check your email for a link to complete your signup.</p>
        </section>)
    }

    return (<section>
    <h2>Create account</h2>
    <FormControl>
        <TextField
            required
            label="Email"
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
        />
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </section>)
}

export default GetEmailForSignUpPage