import { useEffect, useState } from "react"
import CommentCreator from "./CommentCreator"
import { getComments } from "../../../api";
import CommentsList from "./CommentsList";
import Loading from "../Loading";

function CommentsSection({content, ratingVisibilityUpdated}){
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true);
        getComments(content.song_id ? "songs" : "albums", content.song_id ?? content.album_id).then((comments) => {
            setIsLoading(false);
            setComments(comments);
        }).catch((err) => {
            setIsLoading(false);
            setError("Error fetching comments. Please try again later.")
        })
    }, [])

    return (<section>
            {isLoading ? <Loading/> : (error ? <p>{error}</p> : <>
                <CommentCreator contentType={content.song_id ? "songs" : "albums"} content_id={content.song_id ?? content.album_id} setComments={setComments}/>
                <CommentsList comments={comments} setComments={setComments} ratingVisibilityUpdated={ratingVisibilityUpdated}/>
            </>)}
        </section>)
}

export default CommentsSection