import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import wait from "../../utils/wait";
import { signOut } from "firebase/auth";
import { Avatar, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../firebase-config";

function UserDropdown({setSignOutError}){
    const {signedInUser, setSignedInUser} = useContext(UserContext);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureError, setProfilePictureError] = useState("")
    const [displayUserList, setDisplayUserList] = useState(false);
    const isUserSignedIn = Object.keys(signedInUser).length !== 0;
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(isUserSignedIn){
            setIsLoading(true);
            const profilePictureRef = ref(storage, `${signedInUser.user_id}/images/profile-picture/${signedInUser.profile_picture}`)
            getDownloadURL(profilePictureRef).then((profilePicture) => {
                setIsLoading(false);
                setProfilePicture(profilePicture);
            }).catch((err) => {
                setIsLoading(false);
                setProfilePictureError("Could not get profile picture.");
            })
        }
    }, [signedInUser])

    function handleViewProfile(){
        setDisplayUserList(false);
        navigate(`/users/${signedInUser.user_id}`)
    }

    function handleSignOut(){
        const previousLocationString = `${location.pathname}${location.search}`
        navigate("/loading")
        return wait(2).then(() => {
            return signOut(auth)
        }).then(() => {
            setSignedInUser({});
        }).catch((err) => {
            setSignOutError("Error signing out. Please try again later.");
        }).finally(() => {
            setDisplayUserList(false);
            navigate(previousLocationString);
        })
    }

    return (<>
        {!profilePictureError ? <Avatar 
            src={profilePicture}
            alt={`${signedInUser.username}'s profile picture`}
            onClick={() => {setDisplayUserList((displayUserList) => {return !displayUserList})}}
            style={{cursor: "pointer"}}
        /> : null}
        {displayUserList ? 
        <List>
            <ListItem>
                <ListItemButton onClick={handleViewProfile}>
                    <ListItemText primary="View Profile"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={handleSignOut}>
                    <ListItemText primary="Sign Out"/>
                </ListItemButton>
            </ListItem>
        </List> : null}
    </>)
}

export default UserDropdown