import { deleteLink } from "#api";
import { Button, ListItem, TextField } from "@mui/material"
import { useEffect, useState } from "react";

function UserLinkEditor({link, setLinks}){
    const [name, setName] = useState(link.name);
    const [URL, setURL] = useState(link.url);

    useEffect(() => {
        setLinks((links) => {
            const newLinks = [...links];
            const currentIndex = newLinks.map((linkInMap) => {
                return linkInMap.link_id
            }).indexOf(link.link_id);
            newLinks[currentIndex].name = name;
            newLinks[currentIndex].url = URL;
            return newLinks;
        })
    }, [name, URL])

    function handleDelete(){
        deleteLink(link.link_id).then(() => {
            window.location.reload(false);
        })
    }

    return (
        <ListItem>
            <TextField
                required
                label="Name"
                value={name}
                onChange={(event) => {setName(event.target.value)}}
            />
            <TextField
                required
                label="URL"
                value={URL}
                onChange={(event) => {setURL(event.target.value)}}
            />
            {link.link_id ? <Button color="error" onClick={handleDelete}>Delete</Button> : null}
        </ListItem>
    )
}

export default UserLinkEditor