import { css } from "@emotion/css"
import { Link } from "@mui/material"
import { Link as ReactDOMLink } from "react-router-dom"

function StyledLink({to, target, children}){
    return <Link component={ReactDOMLink} target={target} to={to}>{children}</Link>
}

export default StyledLink