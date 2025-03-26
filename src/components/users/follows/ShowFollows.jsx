import { useEffect, useState } from "react"
import { getUserById } from "../../../../api";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../Loading";
import UserCard from "../UserCard";

function ShowFollows(){
    const [artistName, setArtistName] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const {user_id} = useParams();
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        getUserById(user_id).then((user) => {
            setUsers(location.pathname.includes("/followers") ? user.followers : user.following)
            setArtistName(user.artist_name);
            setIsLoading(false);
        }).catch((err) => {
            setError("Error fetching users. Please try again later.");
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{artistName}'s {location.pathname.split("/")[3]}</h2>
        {users.map((user) => {
            return <UserCard key={`user-card-${user.user_id}`} user={user.follower ?? user.following}/>
        })}
    </section>)
}

export default ShowFollows