import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getUserById } from "../../../api";
import Loading from "../Loading";
import StyledLink from "../styling/StyledLink";
import { Avatar } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase-config";
import { UserContext } from "../../contexts/UserContext";
import DisplayCategory from "./DisplayCategory";
import getProfilePictureDirectory from "../../utils/get-profile-picture-directory";

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
            setProfilePictureURL(profilePictureURL)
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
            <Avatar
                src={profilePictureURL}
                alt={`${user.username}'s profile picture`}
                sx={{ width: 100, height: 100 }}
            />
            <h2>{user.artist_name}</h2>
            <p>{`@${user.username}`}</p>
            <h2>Description</h2>
            <p>{user.description}</p>
        </header>
        <DisplayCategory/>
    </>)
}

export default UserPage