import { Box, Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import StyledLink from "./styling/StyledLink";
import { useEffect, useState } from "react";
import updates from "../../updates.json"
import { version } from "../../package.json"
import eighthNote from "../images/Neurosongs_note.png"
import Markdown from "react-markdown";
import { Link } from "react-router-dom";

function Homepage(){
    const [viewUpdates, setViewUpdates] = useState(false);

    return (<section>
        <header>
            <h2>Welcome to Neurosongs!</h2>
            <p>v{version}</p>
            <p>By: Alex Man</p>
        </header>
            <Button onClick={() => {setViewUpdates((viewUpdates) => {return !viewUpdates})}}>{viewUpdates ? "Hide" : "See"} recent updates</Button>
            {viewUpdates ? 
            <List sx={{
                    paddingLeft: "1vw",
                    paddingTop: "3vh",
                    border: 0.5,
                    borderRadius: 0.7,
                }}
            >
                {updates.map((update) => {
                    return (
                    <>
                        <ListItem key={update.id} sx={{marginTop: "-30px"}}>
                            <ListItemIcon>
                                <img src={eighthNote} alt="Bullet point" style={{width: "25px", height: "auto"}}/>
                            </ListItemIcon>
                                <ListItemText primary={
                                    <Markdown>
                                        {update.message}
                                    </Markdown>}
                                />
                        </ListItem>
                        {update.subPoints ? 
                        <List sx={{paddingLeft: "35px"}}>
                            {update.subPoints.map((subPoint, index) => {
                                return (
                                    <ListItem key={`subpoint-${subPoint.id}`} sx={{marginTop: "-30px"}}>
                                        <ListItemIcon>
                                            <img src={eighthNote} alt="Bullet point" style={{width: "25px", height: "auto"}}/>
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Markdown>
                                                {subPoint.message}
                                            </Markdown>}
                                        />
                                    </ListItem>
                                    )
                                })}
                        </List> : null}
                    </>
                    )
                })}
            </List>
            : null}
            <main>
                <p>Welcome to my latest project. This is a website I created called Neurosongs, and it essentially aims to be a community site for musicians. You can think of it as being somewhat of a mix between YouTube, Spotify, and a hint of Metacritic. It has the streaming capabilities of Spotify, mixed with the community aspects of YouTube, and you can also give each song a numerical rating, similarly to Metacritic.</p>

                <p>You can either experience this site as a signed out user, or a signed in user. As a signed out user, you'll only be able to explore the songs and albums, and see other people's comments. However, as a signed in user, you'll also have the ability to leave comments and ratings on other people's music, follow other users so that you can easily keep up-to-date with what they're posting, as well as post some of your own songs for others to hear! You can also change your profile picture, set a user description, and really make your presence on this site unique to you.</p>

                <p>Signing in is managed with the help of Firebase to help make the experience smooth and secure. You can either sign in with Google, or directly by email. If you sign in with email, you'll also need to provide a password, but don't worry - Firebase deals with this securely so I don't ever have access to it.</p>

                <p>If you want to hear some of my own songs that I've created, you can check out my own profile, <StyledLink to="https://neurosongs.netlify.app/users/7asm4JCpeBXep2LwrcurUdrHpFO2">@AlexTheMan</StyledLink>. There you'll find a bunch of songs I've created with the help of Logic Pro X as my DAW, and Synth V for access to some vocal synths to sing the vocal melodies I've created.</p>

                <p>With all that said, have fun exploring the site! If you enjoyed your visit (and even if you didn't), please feel free to let me know your thoughts by filling out <StyledLink to="https://docs.google.com/forms/d/e/1FAIpQLScILg15VZOUU-JwXj9nh5amvmOP35VE_cGz4BIAMRzzA8Alkw/viewform?usp=dialog">this feedback form.</StyledLink> This will allow me to keep improving the experience and keep working to make this site the best it can be!</p>

                <p>All credit goes to <StyledLink to="https://neurosongs.netlify.app/users/jr3mIiI6v3WOVZQW1khWXR31bXu1">Space Pawdity</StyledLink> for the logo design. They designed the main logo you see at the top of the page, as well as the app icon.</p>

                <p>I'll leave it here for now. Enjoy the site!</p>

                <p><StyledLink to="https://neurosongs-privacy.netlify.app/">See privacy policy</StyledLink></p>
                <Button
                    component={Link}
                    to="/featured"
                    variant="contained"
                    sx={{display: "flex", justifySelf: "center"}}
                >
                    Go to featured content
                </Button>
            </main>
        </section>)
}

export default Homepage