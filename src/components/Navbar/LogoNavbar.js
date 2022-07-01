import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/PR3.jpg";

export const LogoNavbar = (props) => {

  const { linkTo } = props;
  return (
    <Link aria-current="page" to={linkTo} style={{ textDecoration: 'none' }}>
      <img src={logo} alt="Logo de Petroquimica"></img>
    </Link>
  );
};
