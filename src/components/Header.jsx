import Navigation from "./Navigation"
import StyledLink from "./styling/StyledLink"

function Header(){
    return (<header>
        <StyledLink to="/">Homepage</StyledLink>
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}

export default Header