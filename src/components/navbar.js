import { Home, Search, Album } from "@mui/icons-material";

const NavbarItems = [
  {
    key: "/",
    to: "/",
    icon: Home,
    color: "text",
    label: "NeuroSongs",
  },
  {
    key: "/featured",
    to: "/featured",
    icon: Album,
    color: "text",
    label: "Featured",
  },
  {
    key: "/search",
    to: "/search",
    icon: Search,
    color: "text",
    label: "Search",
  },
];

export default NavbarItems;
