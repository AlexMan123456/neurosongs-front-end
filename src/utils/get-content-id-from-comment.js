function getContentIDFromComment(comment){
    if(comment.song || comment.album){
        return comment.song.song_id ?? comment.album.album_id
    }
    return comment.replying_to?.song?.song_id ?? comment.replying_to?.album?.album_id
}

export default getContentIDFromComment