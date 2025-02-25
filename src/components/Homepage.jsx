import StyledLink from "./styling/StyledLink"

function Homepage(){
    return (<section>
        <header>
            <h2>Welcome to Neurosongs!</h2>
            <p>By: Alex Man</p>
        </header>
            <p>Welcome to my latest project. This is a website created Neurosongs, and it essentially aims to be a community site for musicians. You can think of it as being somewhat of a mix between YouTube and Spotify, in that it has the streaming capabilities of Spotify, mixed with the community aspects of YouTube.</p>

            <p>You can either experience this site as a signed out user, or a signed in user. As a signed out user, you'll only be able to explore the songs and albums, and see other people's comments. It's a serviceable experience, but nothing special.</p>

            <p>However, as a signed in user, you'll also have the ability to leave comments and ratings on other people's music, as well as post some of your own songs for others to hear! You can also change your profile picture, set a user description, and really make your presence on this site unique to you.</p>

            <p>If you want to hear some of my own songs that I've created, you can check out the featured page. There you'll find an album I've called Neural Anthems++, which is a remake of an album I made back in 2023, as well as a few suggested songs from the album that I'm most proud of.</p>

            <p>With all that said, have fun exploring the site! If you enjoyed your visit (and even if you didn't), please feel free to let me know your thoughts by filling out <StyledLink to="https://docs.google.com/forms/d/e/1FAIpQLScILg15VZOUU-JwXj9nh5amvmOP35VE_cGz4BIAMRzzA8Alkw/viewform?usp=dialog">this feedback form.</StyledLink> This will allow me to keep improving the experience and keep working to make this site the best it can be!</p>

            <p>I'll leave it here for now. Enjoy the site!</p>

            <p><StyledLink to="/featured">See featured content</StyledLink></p>
        </section>)
}

export default Homepage