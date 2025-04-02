import { createContext, useContext } from "react"
import { ScreenSizeContext } from "./ScreenSizeContext";
import NavigationDrawer from "#components/NavigationDrawer";

const NavigationContext = createContext();

function NavigationProvider({children}){
    const {isLargeScreen} = useContext(ScreenSizeContext);

    return isLargeScreen ? <NavigationDrawer>{children}</NavigationDrawer> : children
}

export { NavigationContext, NavigationProvider }