import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material'
import { ScreenSizeProvider } from './contexts/ScreenSizeContext.jsx'

const theme = createTheme({
  typography: {
    fontFamily: [
      "Futura",
      "Arial",
      "Helvetica",
      "sans-serif"
    ]
  }
  
})

createRoot(document.getElementById('root')).render(
  <ScreenSizeProvider>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </ScreenSizeProvider>
)
