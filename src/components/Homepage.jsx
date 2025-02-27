import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import StyledLink from "./styling/StyledLink"
import { useEffect, useState } from "react"
import axios from "axios";
import wait from "../utils/wait";
import Loading from "./Loading";
import formatDateAndTime from "../utils/format-date-and-time";
import formatDate from "../utils/format-date";
import getCommitsFromRecentBranch from "../utils/get-commits-from-recent-branch";
import { Circle } from "@mui/icons-material";

function Homepage(){
    const [viewCommits, setViewCommits] = useState(false);
    const [commits, setCommits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        axios.get(import.meta.env.VITE_GITHUB_API_COMMITS_URL).then(({data}) => {
            setCommits(data);
        }).catch((err) => {
            setError("Error fetching update information. Please try again later.")
            return wait(4).then(() => {
                setError("");
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])

    if(isLoading){
        return <Loading/>
    }

    return (<section>
        <header>
            <h2>Welcome to Neurosongs!</h2>
            <p>By: Alex Man</p>
        </header>
            <Button onClick={() => {setViewCommits((viewCommits) => {return !viewCommits})}}>{viewCommits ? "Hide" : "See"} recent updates</Button>
            {viewCommits ? 
            <List sx={{
                    paddingLeft: "1vw",
                    border: 0.5,
                    borderRadius: 0.7
                }}
            >
                {getCommitsFromRecentBranch(commits).map((commit) => {
                    return (<ListItem key={commit.url}>
                            <ListItemIcon>
                                <Circle fontSize="small" color="info" />
                            </ListItemIcon>
                            <ListItemText primary={commit.message}/>
                        </ListItem>)
                })}
            </List>
            : null}
            <p>Welcome to my latest project. This is a website I created called Neurosongs, and it essentially aims to be a community site for musicians. You can think of it as being somewhat of a mix between YouTube and Spotify, in that it has the streaming capabilities of Spotify, mixed with the community aspects of YouTube.</p>

            <p>You can either experience this site as a signed out user, or a signed in user. As a signed out user, you'll only be able to explore the songs and albums, and see other people's comments. It's a serviceable experience, but nothing special.</p>

            <p>However, as a signed in user, you'll also have the ability to leave comments and ratings on other people's music, as well as post some of your own songs for others to hear! You can also change your profile picture, set a user description, and really make your presence on this site unique to you.</p>

            <p>Signing in is managed with the help of Firebase to help make the experience smooth and secure. You can either sign in with Google, or directly by email. If you sign in with email, you'll also need to provide a password, but don't worry - Firebase deals with this securely so I don't ever have access to it.</p>

            <p>If you want to hear some of my own songs that I've created, you can check out the featured page. There you'll find an album I've called Neural Anthems++, which is a remake of an album I made back in 2023, as well as a few suggested songs from the album that I'm most proud of.</p>

            <p>With all that said, have fun exploring the site! If you enjoyed your visit (and even if you didn't), please feel free to let me know your thoughts by filling out <StyledLink to="https://docs.google.com/forms/d/e/1FAIpQLScILg15VZOUU-JwXj9nh5amvmOP35VE_cGz4BIAMRzzA8Alkw/viewform?usp=dialog">this feedback form.</StyledLink> This will allow me to keep improving the experience and keep working to make this site the best it can be!</p>

            <p>I'll leave it here for now. Enjoy the site!</p>

            <p><StyledLink to="/featured">See featured content</StyledLink></p>
        </section>)
}

export default Homepage