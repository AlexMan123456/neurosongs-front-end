import { Button, FormControl, TextField } from "@mui/material"
import { useState } from "react";
import { auth } from "../../../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { getUsers } from "../../../../../api";
import Loading from "../../../Loading";

function GetEmailToResetPassword(){
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState("");

    const actionCodeSettings = {
        url: `${import.meta.env.VITE_BASE_URL}/`,
        handleCodeInApp: true
    }

    function handleSubmit(){
        setIsLoading(true);
        return sendPasswordResetEmail(auth, email, actionCodeSettings).then(() => {
            return getUsers()
        }).then((users) => {
            const userEmails = users.map((user) => {
                return user.email
            })

            if(!userEmails.includes(email)){
                return Promise.reject({status: 404, message: "There is currently no user signed up to this site with this email address."})
            }
            localStorage.setItem("email", email)
            setIsLoading(false);
            setEmailSent(true);
        }).catch((err) => {
            console.log(err)
            setIsLoading(false);
            if(err.status === 404){
                setError(err.message)
                return;
            }
            if(err.code === "auth/invalid-email"){
                setError("Invalid email. Please try again.");
                return;
            }
            setError("Error verifying email. Please try again later.")
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(emailSent){
        return (<section>
            <h2>A verification email has been sent to {email}</h2>
            <p>Please check your email for a link to reset your password.</p>
        </section>)
    }

    return (<section>
        <h2>Reset Password</h2>
        <p>Please confirm your email address.</p>
        <FormControl>
            <TextField
                required
                label="Email"
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
            />
            {error ? <p>{error}</p> : null}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </FormControl>
    </section>)
}

export default GetEmailToResetPassword