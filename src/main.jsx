import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({

  palette: {
    primary: {
      light: '#fff',
      dark: '#333',
      main: '#B2DFDB',
    },
    secondary: {
      light: '#fff',
      dark: '#333',
      main: '#006064',
    },
    text: {
      main: "#333",
      dark: "#fff",
    }
  },

})

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <UserProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </UserProvider>
  </LocalizationProvider>
)
