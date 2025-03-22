import { createContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext();

function ScreenSizeProvider({children}){
    const largeScreenCondition = window.innerWidth > 669 && window.innerHeight > 800;
    const [isLargeScreen, setIsLargeScreen] = useState(largeScreenCondition);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    function handleResize(){
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        setIsLargeScreen(window.innerWidth > 669 && window.innerHeight > 669);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {window.removeEventListener("resize", handleResize)};
    }, [])

    return (
        <ScreenSizeContext.Provider
            value={{
                isLargeScreen,
                windowWidth,
                windowHeight
            }}
        >
            {children}
        </ScreenSizeContext.Provider>
    )
}

export { ScreenSizeContext, ScreenSizeProvider };