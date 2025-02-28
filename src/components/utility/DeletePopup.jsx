import { Backdrop, Box, Button, Typography } from "@mui/material"

function DeletePopup({showMessage, setShowMessage, onDelete, children}){    
    return (<Backdrop
        open={showMessage}
        onClick={() => {setShowMessage(false)}}
    >
        <Box sx={{backgroundColor: "white", borderRadius: 0.7}}>
            <Typography sx={{paddingLeft: "0.5vw", paddingRight: "0.5vw"}}>{children}</Typography>
            <Box sx={{textAlign: "center"}}>
                <Button onClick={onDelete} color="success">Yes</Button>
                <Button onClick={() => {setShowMessage(false)}} color="error">No</Button>
            </Box>
        </Box>
    </Backdrop>)
}

export default DeletePopup