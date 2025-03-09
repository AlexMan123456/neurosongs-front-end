import { useContext, useState } from "react"
import Navigation from "./Navigation"
import UserDropdown from "./header/UserDropdown";
import { UserContext } from "../contexts/UserContext";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";
import { Home, Login } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import ThemeToggle from "./styling/ThemeToggle";



export default function NavBar() {
  const { isUserSignedIn } = useContext(UserContext);
  const [signOutError, setSignOutError] = useState("");

  return (
    <>
      <nav>

        <Box className='flex-center' sx={{ bgcolor: 'primary.main' }}>
          <Button
            component={Link}
            to="/"
            color="text"
          >
            <Home color="secondary" />
            <span style={{ paddingLeft: '10px' }} />
            NeuroSongs
          </Button>

          {isUserSignedIn
            ?
            <UserDropdown setSignOutError={setSignOutError} />
            :
            <Box className="fixed-right">
              <Button
                component={Link}
                to="/sign_in"
                color="text"
              >
                <Login color="secondary" />
                <span style={{ paddingLeft: '10px' }} />
                Sign In
              </Button>
            </Box>
          }
          {signOutError ? <p>{signOutError}</p> : null
          }

          {!isSignInWithEmailLink(auth, window.location.href) ? <Navigation /> : null}
          <ThemeToggle />
        </Box>
      </nav>
    </>
  )
}

