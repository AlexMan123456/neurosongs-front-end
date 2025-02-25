import StyledLink from "./styling/StyledLink"

function Navigation(){
    return (<nav>
        <StyledLink to="/featured">Featured</StyledLink>
        <StyledLink to="/search">Search</StyledLink>
    </nav>)
}

export default Navigation