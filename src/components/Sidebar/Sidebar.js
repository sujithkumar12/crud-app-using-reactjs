import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Logo from "../../assets/acce.png";
import Dashboardi from "../../assets/dashboard.png";
import ListItemText from "@mui/material/ListItemText";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "reactstrap";
import Button from "@mui/material/Button";

const drawerWidth = 233;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const menus = [{ title: "Dashboard", src: Dashboardi, page: "/" }];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }} variant="persistent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, color: "black", ...(open && { display: "none" }) }}
          >
            <AiOutlineMenuUnfold />
          </IconButton>
          <Button
            color="inherit"
            onClick={handleLogout}
            edge="end"
            sx={{
              color: "black",
              fontSize: "1.2rem",
              textTransform: "capitalize",
              justifyContent: "end",
              marginLeft: "auto",
              fontFamily: "poppins"
            }}
          >
            <MdOutlineLogout />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        // variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div className="flex gap-x-4 items-center">
            <img
              src={Logo}
              alt={Logo}
              className="w-15 h-10 text-left items-start origin-left"
            />
            <p className="text-black origin-left text-xl font-medium" style={{ fontFamily: "poppins" }}>
              Accelerlab
            </p>
          </div>
          <IconButton onClick={handleDrawerClose} sx={{ marginLeft: "20px" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menus.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <NavLink
                  tag={Link}
                  to={menu.page}
                  className="text-black flex items-center gap-x-4 cursor-pointer font-bold p-2 rounded-md text-sm"
                >
                  <img src={menu.src} alt="menu" />
                  <ListItemText primary={menu.title} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open} sx={{padding: "0px", backgroundColor: "wheat"}} className="overflow-hidden">
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
