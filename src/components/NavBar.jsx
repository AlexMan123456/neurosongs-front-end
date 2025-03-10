import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import UserDropdown from "./header/UserDropdown";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase-config";
import { isSignInWithEmailLink } from "firebase/auth";
import ThemeToggle from "./styling/ThemeToggle";
import NavbarItems from "./navbar";

export default function NavBar() {
  const { isUserSignedIn } = useContext(UserContext);
  const [signOutError, setSignOutError] = useState("");
  const location = useLocation(); // Get current route

  // Checks to see if the user is on the sign-in page and hides the navbar if they are.
  // should change the signin page to a whole card item that has a single back button that takes you back a page. or you could use the browser back page button
  const isSignInPage = location.pathname === "/sign_in";
  if (isSignInPage) return null;

  return (
    <>
      {isUserSignedIn ? (
        <UserDropdown setSignOutError={setSignOutError} />
      ) : (
        <Box className="flex-center" sx={{ bgcolor: "primary.main" }}>
          {NavbarItems.map((item) => (
            <Button
              key={item.key}
              component={Link}
              to={item.to}
              color={item.color}
            >
              <item.icon />
              <span style={{ paddingLeft: "10px" }} />
              <p>{item.label}</p>
            </Button>
          ))}

          <Box className="fixed-right">
            <Button component={Link} to="/sign_in" color="text">
              <Login color="secondary" />
              <span style={{ paddingLeft: "10px" }} />
              Sign In
            </Button>
          </Box>
          <ThemeToggle />
        </Box>
      )}

      {signOutError && <p>{signOutError}</p>}

      {!isSignInWithEmailLink(auth, window.location.href) && <></>}
    </>
  );
}
