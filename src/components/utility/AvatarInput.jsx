import { Avatar } from "@mui/material";
import turnFileIntoBase64URL from "../../utils/turn-file-into-base-64-url"
import FileInput from "../styling/FileInput"
import wait from "../../utils/wait";
import { useState } from "react";

function AvatarInput({file, setFile, children}){
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(incomingFile){
        setIsLoading(true);
        setFile(incomingFile)
        return turnFileIntoBase64URL(incomingFile).then((imageURL) => {
            setImage(imageURL);
            setIsLoading(false);
        }).catch((err) => {
            setError("Could not set profile picture. Please try again later.")
            setIsLoading(false);
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    return (<>
        <Avatar src={image} alt={file?.name}/>
        <FileInput onChange={handleChange} accept="image/*">{children}</FileInput>
    </>)
}

export default AvatarInput