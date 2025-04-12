import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react";

function VisibilityOptions({visibility, setVisibility, width, albumVisibility}){
    const [visibilityOptions, setVisibilityOptions] = useState(["private"]);

    useEffect(() => {
        if(albumVisibility === "public" || !albumVisibility){
            setVisibilityOptions((visibilityOptions) => {
                const newOptions = [...visibilityOptions];
                newOptions.unshift("unlisted");
                newOptions.unshift("public");
                return newOptions;
            })
        } else if(albumVisibility === "unlisted") {
            setVisibilityOptions((visibilityOptions) => {
                const newOptions = [...visibilityOptions];
                newOptions.unshift("unlisted");
                return newOptions;
            })
        }
    }, [])

    return (
        <FormControl sx={{width}}>
            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select labelId="visibility-label" value={visibility} onChange={(event) => {setVisibility(event.target.value)}} defaultValue={visibility ?? albumVisibility ?? "public"}>
                {visibilityOptions.map((option) => {
                    return <MenuItem key={option} value={option}>{option}</MenuItem>
                })}
                {/* COMING SOON: Restricted */}
            </Select>
        </FormControl>
    )
}

export default VisibilityOptions