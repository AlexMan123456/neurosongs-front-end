import { createContext, useContext } from "react"
import { ScreenSizeContext } from "./ScreenSizeContext";
import NavigationDrawer from "#components/navigation/NavigationDrawer";
import NavigationBottom from "#components/navigation/NavigationBottom";

const NavigationContext = createContext();

function NavigationProvider({children}){
    const {isLargeScreen} = useContext(ScreenSizeContext);

    return (
        <NavigationContext.Provider value={{}}>
            {isLargeScreen ? <NavigationDrawer>{children}</NavigationDrawer> : <NavigationBottom>{children}</NavigationBottom>}
        </NavigationContext.Provider>
    )
}

export { NavigationContext, NavigationProvider }