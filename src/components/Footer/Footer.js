import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import { footerStyle } from "./FooterStyle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => footerStyle(theme));

export const Footer = () => {

  const classes = useStyles();
  return <footer className = {classes.content}>
    <Box pt={4}>
      <Typography variant="body2" color="textSecondary" align="center" >
        {"Copyright © "}
        <Link color="inherit" to={'/'}>
          Instrumentos PRIII 
        </Link >{" "}
        {new Date().getFullYear() }{" "}
        - Guillermo Ferrucci
        {"."}
      </Typography>
    </Box>
  </footer>
};
