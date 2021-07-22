import React from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import { drawerContainerStyle } from './DrawerContainerStyle';
import { listItems } from './MainListItems/ListItems';
import { LogoNavbar } from '../LogoNavbar';


const useStyles = makeStyles((theme) => drawerContainerStyle(theme));

export const DrawerContainer = ({handleDrawerClose, open}) => {
    const classes = useStyles();

    return <Drawer
        variant="permanent"
        classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }}
        open={open}
    >
        <div className={classes.toolbarIcon}>
            <LogoNavbar />
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <List>{listItems}</List>
        <Divider />
        <List></List>
    </Drawer>
}
