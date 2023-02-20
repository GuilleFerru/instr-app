import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DrawerContainer } from "../Navbar/Drawer/DrawerContainer";
import { AppBarContainer } from "../Navbar/AppBar/AppBarContainer";




export const Navbar = ({ children }) => {
  
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
