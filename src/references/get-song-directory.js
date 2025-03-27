function getSongDirectory({user_id, album_id, reference}){
    return `${user_id}/albums/${album_id}/songs/${reference}`
}

export default getSongDirectory