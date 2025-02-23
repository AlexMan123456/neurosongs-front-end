function getAlbumCoverDirectory(album, side){
    return `${album.user_id}/albums/${album.album_id}/images/${album[side === "front" ? "front_cover_reference" : "back_cover_reference"]}`
}

export default getAlbumCoverDirectory