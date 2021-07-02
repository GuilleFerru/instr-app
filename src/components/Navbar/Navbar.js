import React from "react";
import { makeStyles } from "@material-ui/core";
import { navbarStyle } from "./NavbarStyle";
import logo from "../../img/logoPRIII_xs.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => navbarStyle(theme));

const LogoNavbar = () => {
  return (
    <Link aria-current="page" to={"/"}>
      <img src={logo} alt="Logo de la cerveceria"></img>
    </Link>
  );
};

export const Navbar = () => {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <nav className={classes.innerWrap}>
        <div className={classes.logoDesktop}>
          <LogoNavbar />
        </div>
        <div></div>
        <div></div>
      </nav>
    </header>
  );
};
