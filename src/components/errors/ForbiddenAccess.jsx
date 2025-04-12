import StyledLink from "#components/styling/StyledLink"

function ForbiddenAccess(){
    return (<section>
        <h2>Access Denied!</h2>
        <p>You're not supposed to be here!</p>
        <StyledLink to="/">Return to homepage</StyledLink>
    </section>)
}

export default ForbiddenAccess