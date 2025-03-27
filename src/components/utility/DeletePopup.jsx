import { Backdrop, Box, Button, Typography, useColorScheme } from "@mui/material"

function DeletePopup({showMessage, setShowMessage, onDelete, children}){    
    const {mode} = useColorScheme();
    return (<Backdrop
        open={showMessage}
        onClick={() => {setShowMessage(false)}}
    >
        <Box sx={{backgroundColor: mode === "dark" ? "black" : "white", borderRadius: 0.7}}>
            <Typography sx={{paddingLeft: "0.5vw", paddingRight: "0.5vw"}}>{children}</Typography>
            <Box sx={{textAlign: "center"}}>
                <Button onClick={onDelete} color="success">Yes</Button>
                <Button onClick={() => {setShowMessage(false)}} color="error">No</Button>
            </Box>
        </Box>
    </Backdrop>)
}

export default DeletePopup