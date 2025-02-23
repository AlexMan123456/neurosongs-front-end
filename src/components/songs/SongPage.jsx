import CommentsSection from "../comments/CommentsSection"
import SongMetadata from "./SongMetadata"

function SongPage(){
    return (<>
        <SongMetadata/>
        <CommentsSection/>
    </>)
}

export default SongPage