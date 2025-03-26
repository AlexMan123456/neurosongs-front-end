function getSongDirectory(song){
    return `${song.user_id}/albums/${song.album_id}/songs/${song.reference}`
}

export default getSongDirectory