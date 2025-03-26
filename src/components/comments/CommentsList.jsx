import { List } from "@mui/material"
import CommentCard from "./CommentCard"

function CommentsList({comments, setComments, ratingVisibilityUpdated}){
    if(comments.length === 0){
        return (<section>
            <h3>There are no comments here yet!</h3>
            <p>Be the first to leave a comment.</p>
        </section>)
    }
    
    return (<List>
        {comments.map((comment) => {
            return <CommentCard key={`comment-${comment.comment_id}`} comment={comment} setComments={setComments} ratingVisibilityUpdated={ratingVisibilityUpdated}/>
        })}
    </List>)
}

export default CommentsList