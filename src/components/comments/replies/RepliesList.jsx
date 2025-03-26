import { useEffect, useState } from "react"
import { getReplies } from "../../../../api"
import Loading from "../../Loading";
import { List } from "@mui/material";
import ReplyCard from "./ReplyCard";

function RepliesList({comment_id, replies, setReplies, ratingVisibilityUpdated}){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getReplies(comment_id).then((replies) => {
            setReplies(replies);
            setIsLoading(false);
        }).catch((err) => {
            setError("Error fetching replies. Please try again later");
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (
        <List>
            {replies.map((reply) => {
                return <ReplyCard key={`reply-${reply.comment_id}`} reply={reply} setReplies={setReplies} ratingVisibilityUpdated={ratingVisibilityUpdated}/>
            })}
        </List>
    )
}

export default RepliesList