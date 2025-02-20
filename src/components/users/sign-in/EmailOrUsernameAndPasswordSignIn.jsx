import { FormControl, TextField } from "@mui/material"
import { useState } from "react"

function EmailOrUsernameAndPasswordSignIn(){
    const [emailOrUsername, setEmailOrUsername] = useState()
    return (<FormControl>
        <TextField
            id="username-text-field"
            label="Username"
        />
    </FormControl>)
}

export default EmailOrUsernameAndPasswordSignIn