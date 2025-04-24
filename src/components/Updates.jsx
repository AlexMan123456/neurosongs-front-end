import { Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react"
import Markdown from "react-markdown";
import updates from "../../updates.json"
import eighthNote from "../images/Neurosongs_note.png"

function Updates(){
    const [viewUpdates, setViewUpdates] = useState(false);
    return (
        <>
            <Button onClick={() => {setViewUpdates((viewUpdates) => {return !viewUpdates})}}>{viewUpdates ? "Hide" : "See"} recent updates</Button>
                {viewUpdates ? 
                <List sx={{
                        paddingLeft: "1vw",
                        paddingTop: "3vh",
                        border: 0.5,
                        borderRadius: 0.7,
                    }}
                >
                    {updates.map((update) => {
                        return (
                            <>
                                <Typography paddingBottom="15px">{update.version}</Typography>
                                {update.changes.map((change) => {
                                     return (
                                     <>
                                         <ListItem key={change.id} sx={{marginTop: "-30px"}}>
                                             <ListItemIcon>
                                                 <img src={eighthNote} alt="Bullet point" style={{width: "25px", height: "auto"}}/>
                                             </ListItemIcon>
                                                 <ListItemText primary={
                                                     <Markdown>
                                                         {change.message}
                                                     </Markdown>}
                                                 />
                                         </ListItem>
                                         {change.subPoints ? 
                                         <List sx={{paddingLeft: "35px"}}>
                                             {change.subPoints.map((subPoint, index) => {
                                                 return (
                                                     <ListItem key={`subpoint-${subPoint.id}`} sx={{marginTop: "-30px"}}>
                                                         <ListItemIcon>
                                                             <img src={eighthNote} alt="Bullet point" style={{width: "25px", height: "auto"}}/>
                                                         </ListItemIcon>
                                                         <ListItemText primary={
                                                             <Markdown>
                                                                 {subPoint.message}
                                                             </Markdown>}
                                                         />
                                                     </ListItem>
                                                     )
                                                 })}
                                         </List> : null}
                                     </>
                                     )
                                 })}
                            </>
                        )
                    })}
                </List>
                : null}
        </>
    )
}

export default Updates