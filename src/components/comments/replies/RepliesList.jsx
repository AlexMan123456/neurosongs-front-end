import { useEffect, useState } from "react"
import { getReplies } from "../../../../api"
import Loading from "../../Loading";
import { Button, List } from "@mui/material";
import ReplyCard from "./ReplyCard";
import { Box } from "@mui/system";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

function RepliesList({comment_id, replies, setReplies, showReplies, setShowReplies, ratingVisibilityUpdated, replyCount}){
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
        <Box>
            <Button onClick={() => {setShowReplies((showReplies) => {return !showReplies})}}>
                {showReplies ? <ArrowDropUp/> : <ArrowDropDown/>} {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </Button>
            {showReplies ?
            <List>
                {replies.map((reply) => {
                    return <ReplyCard key={`reply-${reply.comment_id}`} reply={reply} setReplies={setReplies} ratingVisibilityUpdated={ratingVisibilityUpdated}/>
                })}
            </List>
            : null}
        </Box>
    )
}

export default RepliesList