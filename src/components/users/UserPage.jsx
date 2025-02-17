import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserByUsername } from "../../../api";
import UserSongs from "./UserSongs";

function UserPage(props){
    const {username} = useParams();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true)
        getUserByUsername(username).then((user) => {
            setIsLoading(false);
            setUser(user);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch user. Please try again later.");
        })
    }, [])

    if(isLoading){
        return <p>Now Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{user.artist_name}</h2>
        <p>{`@${user.username}`}</p>
        <UserSongs username={username}/>
    </section>)
}

export default UserPage