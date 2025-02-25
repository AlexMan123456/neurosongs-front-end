import { FormControl } from "@mui/material"
import FileInput from "../../styling/FileInput"

function AlbumCreator(){
    return (<section>
        <h2>Create an album</h2>
        <h3>Please enter the following details</h3>
        <FormControl>
            <FileInput/>
        </FormControl>
    </section>)
}

export default AlbumCreator