import { ScreenSizeContext } from "#contexts/ScreenSizeContext";
import { UserContext } from "#contexts/UserContext";
import { Box, Button, FormControl, FormControlLabel, Grid2, IconButton, Switch, useColorScheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import StyledLink from "#components/styling/StyledLink";
import { DarkMode, LightMode, Login, Person, WbSunny } from "@mui/icons-material";
import { Link } from "react-router-dom";

function HeaderElements(){
    const {isUserSignedIn} = useContext(UserContext);
    const [signOutError, setSignOutError] = useState("");
    const {mode, setMode} = useColorScheme();
    const [isDarkByDefault, setIsDarkByDefault] = useState(mode === "dark");
    const [isDarkMode, setIsDarkMode] = useState(isDarkByDefault);
    const {isLargeScreen} = useContext(ScreenSizeContext)

    useEffect(() => {
        setMode(isDarkMode ? "dark" : "light")
    }, [isDarkMode])

    return (
        <>
            {/* <FormControl sx={{marginLeft: "auto"}}>
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
            </FormControl> */}
            <IconButton
                sx={{marginLeft: "auto"}}
                onClick={() => {setIsDarkMode((darkMode) => {return !darkMode})}}
                aria-label={`Enable ${isDarkMode ? "light" : "dark"} mode`}
            >
               {mode === "dark" ? <LightMode/> : <DarkMode/>}
            </IconButton>
            {isUserSignedIn
            ? 
            <UserDropdown setSignOutError={setSignOutError} isDarkMode={isDarkMode}/>
            : <Box sx={{
                textAlign: "right",
                paddingLeft: "5px"
            }}>
                <Box sx={{
                    display: "flex",
                    paddingRight: "3px",
                    width: isLargeScreen ? null : "90px",
                    height: isLargeScreen ? "20px" : null,
                    alignItems: "center"
                }}>
                    <Button
                        color="inherit"
                        variant="outlined"
                        component={Link}
                        to="/sign_in"
                        sx={{
                            fontSize: isLargeScreen ? null : "12px",
                            textWrap: "nowrap"
                        }}
                    >
                        <Person/> Sign in
                    </Button>
                </Box>
            </Box>
            }
            {signOutError ? <p>{signOutError}</p> : null}
        </>
    )
}

export default HeaderElements