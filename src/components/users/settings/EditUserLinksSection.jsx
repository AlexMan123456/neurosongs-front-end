import { getLinks, patchLink, postLink } from "#api";
import Loading from "#components/Loading";
import { UserContext } from "#contexts/UserContext";
import { Box, Button, List, Stack, TextField, Typography } from "@mui/material"
import { Fragment, useContext, useEffect, useState } from "react"
import UserLinkEditor from "./UserLinkEditor";
import { useNavigate } from "react-router-dom";

function EditUserLinksSection(){
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [addingLink, setAddingLink] = useState(false);
    const {signedInUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getLinks(signedInUser.user_id).then((links) => {
            setLinks(links);
            setIsLoading(false);
        }).catch(() => {
            setError("Error fetching links. Please try again later.")
            setIsLoading(false);
        })
    }, [])

    function handleAddLink(){
        setLinks((links) => {
            const newLinks = [...links];
            newLinks.push({name: "", url: ""});
            return newLinks
        })
    }

    function handleSubmit(){
        setIsLoading(true);
        const promises = [];
        for(const link of links){
            if(link.link_id){
                promises.push(patchLink(link.link_id, link))
            } else {
                promises.push(postLink(signedInUser.user_id, link))
            }
        }
        return Promise.all(promises).then(() => {
            setIsLoading(false);
            navigate(`/users/${signedInUser.user_id}/description`)
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Typography color="error">{error}</Typography>
    }

    return (
        <>
            <h2>Links</h2>
            <Stack spacing={1}>
                <List>
                    {links.length !== 0 ? links.map((link) => {
                        return <UserLinkEditor key={`link-${link.link_id}`} link={link} setLinks={setLinks}/>
                    }) : null}
                </List>
            </Stack>
            <Button onClick={handleAddLink}>Add Link</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default EditUserLinksSection