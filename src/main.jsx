import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ScreenSizeProvider } from './contexts/ScreenSizeContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import './index.css'
import { NavigationProvider } from '#contexts/NavigationContext.jsx'

const theme = createTheme({
  typography: {
    fontFamily: [
      "Futura",
      "Arial",
      "Helvetica",
      "sans-serif"
    ]
  },
  colorSchemes: {
    dark: true
  }
})

createRoot(document.getElementById('root')).render(
  <ScreenSizeProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProvider>
          <BrowserRouter>
            <NavigationProvider>
              <App/>
            </NavigationProvider>
          </BrowserRouter>
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </ScreenSizeProvider>
)
