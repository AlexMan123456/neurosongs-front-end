import { getLinks } from "#api";
import Loading from "#components/Loading";
import StyledLink from "#components/styling/StyledLink";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function UserLinks(){
    const {user_id} = useParams();
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getLinks(user_id).then((links) => {
            setLinks(links);
            setIsLoading(false);
        }).catch(() => {
            setError("Could not fetch links. Please try again later.");
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Typography color="error">{error}</Typography>
    }

    return (
        <>
            <h2>Links</h2>
            <List>
                {links.map((link) => {
                    return <StyledLink key={`link-${link.link_id}`} to={link.url}>{link.name}</StyledLink>
                })}
            </List>
        </>
    )
}

export default UserLinks