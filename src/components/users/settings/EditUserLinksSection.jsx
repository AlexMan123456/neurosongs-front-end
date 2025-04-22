import { getLinks, patchLink, postLink } from "#api";
import Loading from "#components/Loading";
import { UserContext } from "#contexts/UserContext";
import { Box, Button, List, Stack, TextField, Typography } from "@mui/material"
import { Fragment, useContext, useEffect, useState } from "react"
import UserLinkEditor from "./UserLinkEditor";
import { useNavigate } from "react-router-dom";
import { wait } from "#utils";

function EditUserLinksSection(){
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [linkFetchError, setLinkFetchError] = useState("");
    const [linkPostError, setLinkPostError] = useState("");
    const [isAddLinkDisabled, setIsAddLinkDisabled] = useState(false);
    const {signedInUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getLinks(signedInUser.user_id).then((links) => {
            setLinks(links);
            setIsLoading(false);
        }).catch(() => {
            setLinkFetchError("Error fetching links. Please try again later.")
            setIsLoading(false);
        })
    }, [])

    function handleAddLink(){
        setLinks((links) => {
            const newLinks = [...links];
            newLinks.push({name: "", url: ""});
            return newLinks
        })
        setIsAddLinkDisabled(true);
    }

    function handleSubmit(){
        setIsLoading(true);
        const promises = [];
        for(const link of links){
            if(link.link_id){
                const data = {...link}
                delete data.link_id
                delete data.user_id
                promises.push(patchLink(link.link_id, data))
            } else {
                promises.push(postLink(signedInUser.user_id, link))
            }
        }
        return Promise.all(promises).then(() => {
            setIsLoading(false);
            navigate(`/users/${signedInUser.user_id}/description`)
        }).catch((error) => {
            if(error.response?.data?.message === "Invalid URL"){
                setLinkPostError("Invalid URL link. Please try again.");
                setIsLoading(false);
                return wait(4).then(() => {
                    setLinkPostError("");
                })
            }
            setLinkPostError("Error posting link. Please try again later.");
            setIsLoading(false);
        })
    }

    if(isLoading){
        return <Loading/>
    }

    if(linkFetchError){
        return <Typography color="error">{linkFetchError}</Typography>
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
            {linkPostError ? <Typography color="error">{linkPostError}</Typography> : null}
            <Button disabled={isAddLinkDisabled} onClick={handleAddLink}>Add Link</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default EditUserLinksSection