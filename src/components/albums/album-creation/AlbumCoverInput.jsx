import { useState } from "react"
import wait from "../../../utils/wait";
import Loading from "../../Loading";
import FileInput from "../../styling/FileInput";
import StyledImage from "../../styling/StyledImage";

function AlbumCoverInput({setCover, side}){
    const [coverDisplay, setCoverDisplay] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()
    
    function handleCover(file){
        setIsLoading(true);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = (err) => {
                reject(err);
            }
        }).then((coverURL) => {
            setIsLoading(false);
            setCover(file);
            setCoverDisplay(coverURL);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error setting album cover. Please try again later.");
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }
    
    return (<>
        {coverDisplay ? <div>
            <h3>Album {side} cover</h3>
            <StyledImage src={coverDisplay} alt={`Album ${side} cover`}/>
        </div> : null}
        <FileInput 
            onChange={handleCover}
            accept="image/*"
        >
            Set {side} cover
        </FileInput>
    </>)
}

export default AlbumCoverInput