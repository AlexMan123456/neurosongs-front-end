import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../../../api";
import UserSongs from "./UserSongs";
import Loading from "../Loading";

function UserPage(props){
    const {user_id} = useParams();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true)
        getUserById(user_id).then((user) => {
            setIsLoading(false);
            setUser(user);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch user. Please try again later.");
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{user.artist_name}</h2>
        <p>{`@${user.username}`}</p>
        <h3>Songs</h3>
        <UserSongs user_id={user_id}/>
    </section>)
}

export default UserPage