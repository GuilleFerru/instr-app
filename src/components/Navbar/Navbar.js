import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { navbarStyle } from "./NavbarStyle";
import { DrawerContainer } from "../Navbar/Drawer/DrawerContainer";
import { AppBarContainer } from "../Navbar/AppBar/AppBarContainer";


// const useStyles = makeStyles((theme) => navbarStyle(theme));


export const Navbar = ({ children }) => {
  // const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return <>
    <CssBaseline />
    <AppBarContainer handleDrawerOpen={handleDrawerOpen} open={open} />
    <DrawerContainer handleDrawerClose={handleDrawerClose} open={open} />
  </>
};
