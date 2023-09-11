import styled from "@emotion/styled";
import {
  AppBar,
  Chip,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuth } from "../hooks/useAuth";
import Bitchest from "../../public/static/images/bitchest_icon.svg";
import { menus } from "../constants/menus";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EuroIcon from "@mui/icons-material/Euro";
import { AccountBalanceWallet } from "@mui/icons-material";

const drawerWidth = 240;

const Bar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    "& a": {
      textDecoration: "none",
      color: "#222222",
    },
    "& .MuiButtonBase-root": {
      paddingLeft: "22px",
      minWidth: "40px !important",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "48px !important",
    },
  },
}));

export default function CustomAppBar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Bar
        position="absolute"
        open={open}
        sx={{
          "& .MuiToolbar-root": { paddingLeft: "14px !important" },
        }}
      >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <img src={Bitchest} width={50} height={40} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {user.current && user.current.email}
          </Typography>
          <Chip
            sx={{ color: "white", fontSize: "20px" }}
            icon={<AccountBalanceWallet sx={{ color: "white !important" }} />}
            label={user.current && `${user.current.balance} €`}
          />
          <IconButton
            aria-label="delete"
            onClick={() => {
              logout();
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </Bar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ borderRadius: "50px" }}>
            <img src="/static/images/bitchest_logo.png" width={200} />
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {menus.map((m) => {
            return (
              user.current &&
              m.userRoleAccess.includes(user.current.role) && (
                <Link key={m.name} to={{ pathname: m.link }}>
                  <ListItemButton>
                    <ListItemIcon>{m.icon}</ListItemIcon>
                    <ListItemText primary={m.label} />
                  </ListItemButton>
                </Link>
              )
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
