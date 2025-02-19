import { css } from "@emotion/css"
import { Link } from "react-router-dom"

function StyledLink({to, children}){
    return <Link className={css`
        color: blue;
        &:hover {
            color: purple;
        }
    `} to={to}>{children}</Link>
}

export default StyledLink