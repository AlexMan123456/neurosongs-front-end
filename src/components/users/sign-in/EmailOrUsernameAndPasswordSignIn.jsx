import { FormControl, TextField } from "@mui/material"
import { useState } from "react"

function EmailOrUsernameAndPasswordSignIn(){
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    return (<FormControl>
        <TextField
            label="Email or username"
            value={emailOrUsername}
            onChange={(event) => {setEmailOrUsername(event.target.value)}}
        />
        <TextField
            label="Password"
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
        />
    </FormControl>)
}

export default EmailOrUsernameAndPasswordSignIn