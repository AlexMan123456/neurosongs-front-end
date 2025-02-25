import { Button } from "@mui/material"
import VisuallyHiddenInput from "./VisuallyHiddenInput"
import { CloudUpload } from "@mui/icons-material"

function FileInput({onChange, accept, children}){
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
            onChange={(event) => {onChange(event.target.files[0])}}
            multiple
        />
    </Button>)
}

export default FileInput