import { css } from "@emotion/css"
import { Link } from "react-router-dom"

function StyledLink({to, target, children}){
    return <Link target={target} className={css`
        color: blue;
        &:hover {
            color: purple;
        }
        font-family: "Futura", "Arial", "Helvetica", "sans-serif"
        }
    `} to={to}>{children}</Link>
}

export default StyledLink