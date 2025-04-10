import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

function VisibilityOptions({visibility, setVisibility, width}){
    return (
        <FormControl sx={{width}}>
            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select labelId="visibility-label" value={visibility} onChange={(event) => {setVisibility(event.target.value)}}>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="unlisted">Unlisted</MenuItem>
                <MenuItem value="private">Private</MenuItem>
                {/* COMING SOON: Restricted */}
            </Select>
        </FormControl>
    )
}

export default VisibilityOptions