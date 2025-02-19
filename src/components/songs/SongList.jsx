import SongCard from "./SongCard"

function SongList(props){
    const {songs} = props
    return (<div>
        {songs.map((song) => {
            return <SongCard song={song}/>
        })}
    </div>)
}

export default SongList