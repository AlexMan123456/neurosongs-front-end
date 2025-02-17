import { css } from "@emotion/css"
import { Link } from "react-router-dom"

function StyledLink(props){
    return <Link className={css`
        color: blue;
        &:hover {
            color: purple;
        }
    `} to={props.to}>{props.children}</Link>
}

export default StyledLink