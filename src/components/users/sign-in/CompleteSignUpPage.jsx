import { isSignInWithEmailLink, signInWithEmailLink, signOut, updatePassword } from "firebase/auth"
import { auth } from "../../../firebase-config"
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CompleteSignUpPage(){
    const [displayForm, setDisplayForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formLoadError, setFormLoadError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
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
                console.log(err)
                setFormLoadError("Could not sign you in. Please try again later.");
            })
        }
    }, [])

    function handleSubmit(){
        const user = auth.currentUser
        updatePassword(user, password).then(() => {
            return signOut(auth)
        }).then(() => {
            navigate("/sign_in")
        })
        .catch((err) => {
            setPasswordError(err.message)
        })
    }


    if(isLoading){
        return <Loading/>
    }

    if(formLoadError){
        return <p>{formLoadError}</p>
    }

    return (<FormControl>
        <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
        />
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>)
}

export default CompleteSignUpPage