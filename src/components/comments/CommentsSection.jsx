import CommentCreator from "./CommentCreator"

function CommentsSection({content}){
    return (<section>
            <h2>Comments</h2>
            <CommentCreator content={content}/>
        </section>)
}

export default CommentsSection