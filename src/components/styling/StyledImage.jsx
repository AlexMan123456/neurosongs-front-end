import { useContext } from "react";
import { ScreenSizeContext } from "../../contexts/ScreenSizeContext";

function StyledImage({src, alt}){
    const {isLargeScreen} = useContext(ScreenSizeContext);

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