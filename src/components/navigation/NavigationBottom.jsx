import Loading from "#components/Loading";
import { UserContext } from "#contexts/UserContext";
import { storage } from "#firebase-config";
import { getProfilePictureDirectory } from "#references";
import { AccessTime, Search, Star } from "@mui/icons-material"
import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavigationBottom({children}){
    const location = useLocation();
    const [value, setValue] = useState("");
    const {signedInUser, isUserSignedIn} = useContext(UserContext);
    const [profilePictureURL, setProfilePictureURL] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(location.pathname.includes("users")){
            setValue("profile")
            return;
        }
        setValue(location.pathname.split("/")[1])
    }, [location])

    useEffect(() => {
        if(isUserSignedIn){
            setIsLoading(true);
            const profilePictureRef = ref(storage, getProfilePictureDirectory(signedInUser))
            getDownloadURL(profilePictureRef).then((profilePicture) => {
                setProfilePictureURL(profilePicture);
                setIsLoading(false);
            })
        }
    }, [signedInUser])

    return (
        <>
            {children}
            <br/>
            <br/>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={() => {setValue(value)}}
                >
                    <BottomNavigationAction 
                        value="featured"
                        label="Featured"
                        icon={<Star/>}
                        component={Link}
                        to="/featured"
                    />
                    <BottomNavigationAction
                        value="recent"
                        label="Recent"
                        icon={<AccessTime/>}
                        component={Link}
                        to="/recent"
                    />
                    <BottomNavigationAction
                        value="search"
                        label="Search"
                        icon={<Search/>}
                        component={Link}
                        to="/search"
                    />
                    {isUserSignedIn ? <BottomNavigationAction
                        value="profile"
                        label="Profile"
                        icon={isLoading ? <Loading/> : <Avatar sx={{width: value === "profile" ? 35 : 30, height: value === "profile" ? 35 : 30}} src={profilePictureURL} alt={`${signedInUser.username}'s profile picture`}/>}
                        component={Link}
                        to={`/users/${signedInUser.user_id}`}
                    /> : null}
                </BottomNavigation>
            </Paper>
        </>
    )
}

export default NavigationBottom