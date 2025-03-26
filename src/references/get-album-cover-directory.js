function getAlbumCoverDirectory(album, side){
    if(side === "front" && album.front_cover_reference === "Default"){
        return "default-front-album-cover.png"
    }
    return `${album.user_id}/albums/${album.album_id}/images/${album[side === "front" ? "front_cover_reference" : "back_cover_reference"]}`
}

export default getAlbumCoverDirectory