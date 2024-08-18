import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DrawerContainer } from "../Navbar/Drawer/DrawerContainer";
import { AppBarContainer } from "../Navbar/AppBar/AppBarContainer";

export const Navbar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);

    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setOpen(false); // Close the drawer on mobile view
    } else {
      setOpen(true); // Open the drawer on desktop view
    }
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBarContainer handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerContainer handleDrawerClose={handleDrawerClose} open={open} />
    </>
  );
};

