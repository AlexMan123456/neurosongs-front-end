import { ListItem, ListItemText } from "@mui/material"

function CommentCard({comment}){
    return (<ListItem
        sx={{
            padding: "35vw 30pvh",
            float: 'left',
            width: '25%',
            border: 0.5,
            borderRadius: 0.7
        }}
    >
        <ListItemText primary={comment.body}/>
    </ListItem>)
}

export default CommentCard