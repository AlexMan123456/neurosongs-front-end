import { getCommentById } from "#api";
import Loading from "#components/Loading";
import StyledLink from "#components/styling/StyledLink";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import CommentCard from "./CommentCard";

function SingleCommentPage(){
    const {comment_id} = useParams();
    const [comment, setComment] = useState({});
    const [topReply, setTopReply] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [contentType, setContentType] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getCommentById(comment_id).then(({comment, reply}) => {
            setComment(comment);
            if(reply){
                setTopReply(reply);
            }
            setContentType(comment.song ? "song" : "album");
            setIsLoading(false);
        }).catch(() => {
            setError("Error fetching comment. Please try again later.");
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <Typography color="error">{error}</Typography>
    }

    return (
        <section>
            <StyledLink to={`/${contentType}s/${comment[`${contentType}_id`]}`}>Comment found on: {comment[contentType].title}</StyledLink>
            <CommentCard comment={comment}/>
        </section>
    )
}

export default SingleCommentPage