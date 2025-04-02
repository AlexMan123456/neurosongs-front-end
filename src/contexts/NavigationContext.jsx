import { createContext, useContext } from "react"
import { ScreenSizeContext } from "./ScreenSizeContext";
import NavigationDrawer from "#components/navigation/NavigationDrawer";
import NavigationBottom from "#components/navigation/NavigationBottom";

const NavigationContext = createContext();

function NavigationProvider({children}){
    const {isLargeScreen} = useContext(ScreenSizeContext);

    return isLargeScreen ? <NavigationDrawer>{children}</NavigationDrawer> : <NavigationBottom>{children}</NavigationBottom>
}

export { NavigationContext, NavigationProvider }