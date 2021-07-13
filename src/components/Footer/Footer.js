import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { footerStyle } from "./FooterStyle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => footerStyle(theme));

export const Footer = () => {

  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center" className={classes.footerContainer}>
      {"Copyright © "}
      <Link color="inherit" to={'/'}>
        Instrumentos PRII 
      </Link >{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
