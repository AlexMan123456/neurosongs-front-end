import { useEffect, useState } from "react"
import CommentCreator from "./CommentCreator"
import { getComments } from "../../../api";
import CommentsList from "./CommentsList";

function CommentsSection({content}){
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        getComments(content.song_id ? "songs" : "albums", content.song_id ?? content.album_id).then((comments) => {
            setComments(comments);
        }).catch((err) => {
            setError("Error fetching comments. Please try again later.")
        })
    }, [])

    return (<section>
            <h2>Comments</h2>
            <CommentCreator contentType={content.song_id ? "songs" : "albums"} content_id={content.song_id ?? content.album_id} setComments={setComments}/>
            <CommentsList comments={comments} setComments={setComments}/>
        </section>)
}

export default CommentsSection