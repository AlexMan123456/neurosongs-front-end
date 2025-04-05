import { Button, FormControl, FormHelperText, Stack, TextField } from "@mui/material"
import { sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../../../firebase-config";
import Loading from "../../../Loading";
import StyledLink from "../../../styling/StyledLink";
import { getUsers } from "../../../../../api";

function GetEmailForSignUpPage(){
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [showEmailExistsMessage, setShowEmailExistsMessage] = useState(false);

    const actionCodeSettings = {
        url: `${import.meta.env.VITE_BASE_URL}/complete_signup`,
        handleCodeInApp: true
    }

    function handleSubmit(event){
        setIsLoading(true);
        getUsers().then((users) => {
            const userEmails = users.map((user) => {
                return user.email;
            })

            if(userEmails.includes(email)){
                return Promise.reject({code: "Email already exists"});
            }
            
            return sendSignInLinkToEmail(auth, email, actionCodeSettings)
        }).then(() => {
            localStorage.setItem("email", email);
            setIsLoading(false);
            setEmailSent(true);
        }).catch((err) => {
            setIsLoading(false);
            if(err.code === "Email already exists"){
                setError("An account with this email already exists.")
                return;
            }
            if(err.code === "auth/invalid-email"){
                setError("Invalid email. Please try again.")
                return;
            }
            setError("Error sending verification email. Please try again later.")
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(emailSent){
        return (<section>
            <h2>A verification email has been sent to {email}</h2>
            <p>Please check your email for a link to complete your signup.</p>
        </section>)
    }

    return (<section>
    <h2>Create account</h2>
    <FormControl>
        <Stack spacing={1}>
            <TextField
                required
                label="Email"
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
                />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Stack>
    </FormControl>
    {error ? <p>{error}</p> : null}
    </section>)
}

export default GetEmailForSignUpPage