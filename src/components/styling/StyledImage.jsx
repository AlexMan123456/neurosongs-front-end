import { useEffect, useState } from "react";

function StyledImage({src, alt}){
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 495)

    useEffect(() => {
        function handleResize(){
            setIsLargeScreen(window.innerWidth > 495);
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