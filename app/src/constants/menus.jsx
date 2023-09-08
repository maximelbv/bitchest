import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const menus = [
  {
    name: "home",
    label: "Home",
    icon: <HomeIcon />,
    link: "/home",
    userRoleAccess: ["member", "admin"],
  },
  {
    name: "myInformations",
    label: "My informations",
    icon: <AccountCircleIcon />,
    link: "/my-informations",
    userRoleAccess: ["member", "admin"],
  },
  {
    name: "usersManagement",
    label: "Users Management",
    icon: <ManageAccountsIcon />,
    link: "/users-management",
    userRoleAccess: ["admin"],
  },
];
