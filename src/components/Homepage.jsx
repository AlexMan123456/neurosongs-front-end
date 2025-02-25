import StyledLink from "./styling/StyledLink"

function Homepage(){
    return (<section>
            <h2>Welcome to Neurosongs!</h2>
            <StyledLink to="/featured">See featured content</StyledLink>
        </section>)
}

export default Homepage