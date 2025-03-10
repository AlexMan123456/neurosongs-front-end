import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch } from "@mui/material";

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Switch 
        checked={darkMode}
        onChange={() => setDarkMode((prevDarkMode) => !prevDarkMode)}
        sx={{
            width: 51.5,
            height: 22.5,
            padding: 0,
            margin: 2,
            '& .MuiSwitch-switchBase': {
              padding: 0.5,
              '&.Mui-checked': {
                transform: 'translateX(28px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                  backgroundColor: '#757575',
                  opacity: 1,
                },
              },
            },
            '& .MuiSwitch-thumb': {
              width: 15,
              height: 15,
              boxShadow: 'none',
            },
            '& .MuiSwitch-track': {
              borderRadius: 34,
              backgroundColor: '#bdbdbd',
              opacity: 1,
              transition: 'background-color 0.3s',
            },
          }}
            />
    </ThemeProvider>
  );
}
