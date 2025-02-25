import { Button } from "@mui/material"
import VisuallyHiddenInput from "./VisuallyHiddenInput"
import { CloudUpload } from "@mui/icons-material"

function FileInput({setFile, accept, children}){
    return (<Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUpload/>}
    >
        {children}
        <VisuallyHiddenInput
            type="file"
            accept={accept}
            onChange={(event) => {setFile(event.target.files[0])}}
            multiple
        />
    </Button>)
}

export default FileInput