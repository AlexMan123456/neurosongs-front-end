import { css } from "@emotion/css";
import { Link } from "react-router-dom";

function TabButton({children, onClick}){
    return (<Link className={css`
        transform: translateX(-1000000%);
        &:focus {
            transform: translateY(0%);
        }
    `} onClick={onClick}>{children}</Link>)
}

export default TabButton