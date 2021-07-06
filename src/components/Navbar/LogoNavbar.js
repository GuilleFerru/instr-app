import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logoPRIII_xs.png";

export const LogoNavbar = () => {
  return (
    <Link aria-current="page" to={"/"}>
      <img src={logo} alt="Logo de la cerveceria"></img>
    </Link>
  );
};
