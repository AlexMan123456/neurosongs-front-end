import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Box, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getUserById, postFollow } from "../../../api";
import Loading from "../Loading";

function FollowControl(){
    const {signedInUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const [followPosted, setFollowPosted] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const {user_id} = useParams();

    useEffect(() => {
        setIsLoading(true);
        getUserById(user_id).then(({follower_count, following_count, followers}) => {
            setFollowerCount(follower_count);
            setFollowingCount(following_count);
            setIsFollowing(
                followers.map(({following}) => {
                    return following.user_id
                }).includes(signedInUser.user_id)
            )
            setIsLoading(false);
        }).catch((err) => {
            setError("Could not fetch follow information. Please try again later.");
            setIsLoading(false);
        })
    }, [followPosted])

    function handleFollow(){
        setIsLoading(true);
        // Apparently it seems to be backwards?!?!
        postFollow(signedInUser.user_id, user_id).then(() => {
            setFollowPosted((followPosted) => {return !followPosted})
            setIsLoading(false);
        }).catch((err) => {
            setError("Error following user. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        })
    }

    if(isLoading){
        return <Loading/>
    }

    return (<>
        <Box id="follow-details" sx={{marginBottom: "2vh"}}>
            <Link className="follow-link" style={{color: "black", fontWeight: "bold", textDecoration: "none"}} to="/">{followerCount} follower{followerCount !== 1 ? "s" : null}</Link>
            <Link className="follow-link" style={{color: "black", fontWeight: "bold", textDecoration: "none"}} to="/">{followingCount} following</Link>
        </Box>
        {isLoading ? <Loading/> : 
        (signedInUser.user_id === user_id ? null : 
            (
                isFollowing
                ? 
                <Button 
                    variant="contained" 
                    color="success"
                >
                    Following
                </Button> 
                : 
                <Button onClick={handleFollow}>Follow</Button>
            )
        )}
        {error ? <p>{error}</p> : null}
        <br/>
        <br/>
    </>)
}

export default FollowControl