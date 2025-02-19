import StyledLink from "./styling/StyledLink"

function Navigation(){
    return (<nav>
        <StyledLink to="/">Featured</StyledLink>
        <StyledLink to="/search">Search</StyledLink>
        <StyledLink to="/about">About</StyledLink>
    </nav>)
}

export default Navigation