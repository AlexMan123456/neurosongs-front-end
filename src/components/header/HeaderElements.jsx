import { ScreenSizeContext } from "#contexts/ScreenSizeContext";
import { UserContext } from "#contexts/UserContext";
import { Box, FormControl, FormControlLabel, Switch, useColorScheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import StyledLink from "#components/styling/StyledLink";
import { Login } from "@mui/icons-material";

function HeaderElements(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const {mode, setMode} = useColorScheme();
    const [isDarkByDefault, setIsDarkByDefault] = useState(mode === "dark");
    const [isDarkMode, setIsDarkMode] = useState(isDarkByDefault);
    const {isLargeScreen, windowWidth} = useContext(ScreenSizeContext)

    useEffect(() => {
        setMode(isDarkMode ? "dark" : "light")
    }, [isDarkMode])

    return (
        <>
            <FormControl sx={{marginLeft: isLargeScreen ? (windowWidth >= 1000 ? "35%" : "20%") : "25%"}}>
                <FormControlLabel
                    control={<Switch
                        defaultChecked={isDarkByDefault}
                        value={isDarkMode}
                        onChange={() => {setIsDarkMode((isDarkMode) => {return !isDarkMode})}}
                    />}
                    value="dark-mode-enabled"
                    label="Enable dark mode"
                    labelPlacement= "end"
                />
            </FormControl>
            {isUserSignedIn
            ? 
            <UserDropdown setSignOutError={setSignOutError} isDarkMode={isDarkMode}/>
            :<Box style={{
                position: "absolute",
                textAlign: "right",
                right: "0px",
                top: "0px"
            }}>
                <StyledLink
                    to="/sign_in"
                    >
                    <Login/>
                </StyledLink>
                <StyledLink to="/sign_in">Sign in</StyledLink>
            </Box>
            }
            {signOutError ? <p>{signOutError}</p> : null}
        </>
    )
}

export default HeaderElements