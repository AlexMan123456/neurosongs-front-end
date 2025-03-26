import AlbumCard from "../../albums/AlbumCard"

function AlbumResults({albums}){
    return albums.map((album) => {
        return <AlbumCard album={album}/>
    })
}

export default AlbumResults