import Navigation from "./Navigation"
import StyledLink from "./styling/StyledLink"

function Header(){
    return (<header>
        <StyledLink to={`/sign_in`}>Sign In</StyledLink>
        <h1>Neurosongs</h1>
        <Navigation/>
    </header>)
}

export default Header