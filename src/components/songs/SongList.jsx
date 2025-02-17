import SongCard from "./SongCard"

function SongList(props){
    const {songs} = props
    return (<>
        {songs.map((song) => {
            return <SongCard song={song}/>
        })}
    </>)
}

export default SongList