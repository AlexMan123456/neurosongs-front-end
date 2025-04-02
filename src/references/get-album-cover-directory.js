function getAlbumCoverDirectory({user_id, album_id, front_cover_reference, back_cover_reference}, side){
    if(side === "front" && front_cover_reference === "Default"){
        return "default-front-album-cover.png"
    }
    return `${user_id}/albums/${album_id}/images/${side === "front" ? front_cover_reference : back_cover_reference}`
}

export default getAlbumCoverDirectory