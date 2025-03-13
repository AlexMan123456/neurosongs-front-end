import { useEffect, useState } from "react";
import isScreenLarge from "../../utils/is-screen-large";

function StyledImage({src, alt}){
    const [isLargeScreen, setIsLargeScreen] = useState(isScreenLarge(window))

    useEffect(() => {
        function handleResize(){
            setIsLargeScreen(isScreenLarge(window));
        }

        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize)}
    }, [])

    return <img 
        style={{
            width: isLargeScreen ? "15vw" : "35vw",
            height: "auto",
            justifySelf: "center"
        }}
        src={src}
        alt={alt}
    />
}

export default StyledImage