import { createContext, useEffect, useState } from "react";
import largeScreenCondition from "../utils/large-screen-condition";

const ScreenSizeContext = createContext();

function ScreenSizeProvider({children}){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [isLargeScreen, setIsLargeScreen] = useState(largeScreenCondition(window.innerWidth, window.innerHeight));
    
    
    useEffect(() => {
        function setDimensions(){
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
        setDimensions()
        window.addEventListener("resize", setDimensions);
        return () => {window.removeEventListener("resize", setDimensions)};
    }, [])

    
    useEffect(() => {
        setIsLargeScreen(largeScreenCondition(windowWidth, windowHeight));
    }, [windowWidth, windowHeight])

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

export { ScreenSizeContext, ScreenSizeProvider }