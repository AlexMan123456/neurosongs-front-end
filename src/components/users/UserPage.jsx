import { Avatar, Button } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../../api";
import { UserContext } from "../../contexts/UserContext";
import { storage } from "../../firebase-config";
import getProfilePictureDirectory from "../../references/get-profile-picture-directory";
import Loading from "../Loading";
import DisplayCategory from "./DisplayCategory";
import FollowControl from "./follows/FollowControl";

function UserPage(){
    const params = useParams();
    const [user, setUser] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState(null);
    const {signedInUser} = useContext(UserContext);

    useEffect(() => {
        setIsLoading(true)
        getUserById(params.user_id).then((user) => {
            setUser(user);
            const profilePictureRef = ref(storage, getProfilePictureDirectory(user));
            return getDownloadURL(profilePictureRef);
        }).then((profilePictureURL) => {
            setIsLoading(false);
            setProfilePictureURL(profilePictureURL);
        }).catch((err) => {
            setIsLoading(false);
            setError("Could not fetch user. Please try again later.");
        })
    }, [params.user_id])

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<>
        <header>
            {signedInUser.user_id === user.user_id ? <Button component={Link} to={`/users/settings`}>Edit</Button> : null}
            <Avatar
                src={profilePictureURL}
                alt={`${user.username}'s profile picture`}
                sx={{ width: 100, height: 100 }}
            />
            <h2>{user.artist_name}</h2>
            <p className="username">{`@${user.username}`}</p>
            <FollowControl/>
        </header>
        <DisplayCategory/>
    </>)
}

export default UserPage