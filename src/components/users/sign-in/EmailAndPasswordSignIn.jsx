import { Button, FormControl, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUserById } from "../../../../api";
import { UserContext } from "../../../contexts/UserContext";

function EmailAndPasswordSignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const {setSignedInUser} = useContext(UserContext);

    function handleSubmit(){
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            return getUserById(userCredentials.user.uid)
        }).then((user) => {
            setSignedInUser(user)
        })
        .catch((err) => {
            setError(err.message)
        })
    }

    return (<FormControl>
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
        <Button onClick={handleSubmit}>Sign in</Button>
    </FormControl>)
}

export default EmailAndPasswordSignIn