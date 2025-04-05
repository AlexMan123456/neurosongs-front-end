import { Button, FormControl, Stack, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { auth } from "../../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserById } from "../../../../../api";
import { UserContext } from "../../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function EmailAndPasswordSignIn({setIsLoading, setSignInError}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setSignedInUser} = useContext(UserContext);
    const navigate = useNavigate()

    function handleSubmit(){
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            return getUserById(userCredentials.user.uid)
        }).then((user) => {
            setSignedInUser(user);
            navigate("/");
        }).catch((err) => {
            setIsLoading(false);
            setSignInError(err.code);
        })
    }

    return (<FormControl>
        <Stack spacing={1}>
            <TextField
                label="Email"
                value={email}
                onChange={(event) => {setEmail(event.target.value)}}
                />
            <TextField
                label="Password"
                value={password}
                type="password"
                onChange={(event) => {setPassword(event.target.value)}}
                />
            <Button variant="contained" onClick={handleSubmit}>Sign in</Button>
        </Stack>
    </FormControl>)
}

export default EmailAndPasswordSignIn