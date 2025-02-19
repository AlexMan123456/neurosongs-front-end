import StyledLink from "./styling/StyledLink"

function Navigation(){
    return (<nav>
        <StyledLink to="/songs">Songs</StyledLink>
        <StyledLink to="/albums">Albums</StyledLink>
    </nav>)
}

export default Navigation