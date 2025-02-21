import { isSignInWithEmailLink, signInWithEmailLink, signOut, updatePassword } from "firebase/auth"
import { auth } from "../../../firebase-config"
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getMissingPasswordRequirements from "../../../utils/get-missing-password-requirements";
import { postUser } from "../../../../api";

function CompleteSignUpPage(){
    const [displayForm, setDisplayForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formLoadError, setFormLoadError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [displayUsernameHelperText, setDisplayUsernameHelperText] = useState(false);
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
                setFormLoadError("Could not sign you in. Please try again later.");
            })
        }
    }, [])

    function handleSubmit(){
        const user = auth.currentUser
        if(username.includes(" ") || username.includes("@")){
            setUsernameError("Username must not contain spaces or @")
            return;
        }
        postUser({
            user_id: user.uid,
            username,
            artist_name,
            email: user.email
        }).then(() => {
            return updatePassword(user, password)
        }).then(() => {
            return signOut(auth);
        }).then(() => {
            navigate("/sign_in");
        })
        .catch((err) => {
            setPasswordError(err)
        })
    }


    if(isLoading){
        return <Loading/>
    }

    if(formLoadError){
        return <p>{formLoadError}</p>
    }

    return (<>
    <h2>Please enter the following details</h2>
    <FormControl>
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
        <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
        />
        {passwordError || usernameError ? <h3>Error creating your account. Please address the following.</h3> : null}
        {passwordError.code === "auth/password-does-not-meet-requirements" ? <>
            <p>Your password does not match the following criteria:</p>
            <ul>
                {getMissingPasswordRequirements(passwordError.message).map((requirement, index) => {
                    return <li key={`requirement-${index}`}>{requirement}</li>
                })}
            </ul>
        </> : null}
        {usernameError ? <p>{usernameError}</p> : null}
        <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
    </>)
}

export default CompleteSignUpPage