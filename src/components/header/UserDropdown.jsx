import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wait from "../../utils/wait";
import { signOut } from "firebase/auth";
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../firebase-config";
import Loading from "../Loading";
import getProfilePictureDirectory from "../../references/get-profile-picture-directory";
import NotificationDot from "./NotificationDot";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";

function UserDropdown({setSignOutError, isDarkMode}){
    const {signedInUser, setSignedInUser, isUserSignedIn} = useContext(UserContext);
    const [profilePicture, setProfilePicture] = useState(null);
    const [displayUserList, setDisplayUserList] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const {isLargeScreen} = useContext(ScreenSizeContext);

    useEffect(() => {
        if(isUserSignedIn){
            setIsLoading(true);
            const profilePictureRef = ref(storage, getProfilePictureDirectory(signedInUser));
            getDownloadURL(profilePictureRef).then((profilePicture) => {
                setIsLoading(false);
                setProfilePicture(profilePicture);
            }).catch((err) => {
                setIsLoading(false)
            })
        }
    }, [signedInUser])

    function handleUserSettings(){
        setDisplayUserList(false);
    }

    function handleSignOut(){
        setDisplayUserList(false);
        const previousLocationString = `${location.pathname}${location.search}`
        navigate("/loading")
        return wait(2).then(() => {
            return signOut(auth)
        }).then(() => {
            setSignedInUser({});
        }).catch((err) => {
            console.log(err)
            setSignOutError("Error signing out. Please try again later.");
        }).finally(() => {
            navigate(previousLocationString);
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (
            <Box 
                sx={{
                    position: "absolute",
                    textAlign: "right",
                    right: "0px",
                    top: "0px",
                    zIndex: 1,
                }}
            >
                <IconButton
                    aria-label="Open user dropdown" 
                    onClick={() => {setDisplayUserList((displayUserList) => {return !displayUserList})}}
                >
                    <NotificationDot notificationCount={notificationCount} setNotificationCount={setNotificationCount}>
                        <Avatar
                            src={profilePicture}
                            alt={`${signedInUser.username}'s profile picture`}
                        />
                    </NotificationDot>
                </IconButton>
                {displayUserList ? 
                <List sx={{
                    width: isLargeScreen ? "20vw" : "50vw",
                    border: 0.5,
                    right: isLargeScreen ? "0.5vw" : "1.2vw",
                    backgroundColor: isDarkMode ? "black" : "white"
                }}>
                    <ListItem>
                        <ListItemButton
                            component={Link}
                            to={`/users/${signedInUser.user_id}`}
                            onClick={() => {setDisplayUserList(false)}}
                        >
                            <ListItemText primary="View Profile"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemButton
                            component={Link}
                            to={`/users/${signedInUser.user_id}/notifications`}
                            onClick={() => {setDisplayUserList(false)}}
                        >
                            <ListItemText primary={
                                notificationCount === 0 ? "View Notifications" : <strong>View Notifications ({notificationCount})</strong>
                            }/>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>

                    <ListItem>
                        <ListItemButton 
                            component={Link}
                            to="/users/settings"
                            onClick={handleUserSettings}>
                            <ListItemText primary="Settings"/>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemButton onClick={handleSignOut}>
                            <ListItemText primary="Sign Out"/>
                        </ListItemButton>
                    </ListItem>
                </List> : null}
            </Box>
    )
}

export default UserDropdown