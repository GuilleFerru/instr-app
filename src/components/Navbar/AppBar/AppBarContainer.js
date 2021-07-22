import React from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, IconButton, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { appBarContainerStyle } from './AppBarContainerStyle';

const useStyles = makeStyles((theme) => appBarContainerStyle(theme));

export const AppBarContainer = ({handleDrawerOpen, open}) => {
    const classes = useStyles();

    return <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
    >
        <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                )}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
            >
                INSTRUMENTOS PRII
            </Typography>

        </Toolbar>
    </AppBar>
}


