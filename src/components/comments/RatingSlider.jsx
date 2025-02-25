import { Box, Grid2, Input, Slider } from "@mui/material"
import getRatingColour from "../../utils/get-rating-colour"

function RatingSlider({rating, setRating}){
    return (<Box>
        <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid2>
                <Slider
                    id="rating-slider"
                    step={0.1}
                    min={1}
                    max={10}
                    value={rating}
                    onChange={(event, newValue) => {setRating(newValue)}}
                    valueLabelDisplay="auto"
                    color={getRatingColour(rating)}
                    aria-labelledby="rating-slider"
                    sx={{width: 250}}
                />
            </Grid2>
            <Grid2>
                <Input
                    value={rating}
                    onChange={(event) => {setRating(event.target.valueAsNumber)}}
                    inputProps={{
                        step: 0.1,
                        min: 1,
                        max: 10,
                        type: 'number',
                        "aria-labelledby": "rating-slider"
                    }}
                />
            </Grid2>
        </Grid2>
    </Box>)
}

export default RatingSlider