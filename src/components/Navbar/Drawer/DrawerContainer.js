import React, { useState } from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from '@material-ui/icons/ListAlt';
import { drawerContainerStyle } from './DrawerContainerStyle';
// import { listItems } from './MainListItems/ListItems';
import { LogoNavbar } from '../LogoNavbar';


import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
// import AllInboxIcon from '@material-ui/icons/AllInbox';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => drawerContainerStyle(theme));




export const DrawerContainer = ({ handleDrawerClose, open }) => {
    const classes = useStyles();

    const [openList, setOpenList] = useState(false);

    const handleClick = () => {
        setOpenList(!openList);
    };

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
        <List>
            {/* ver de llevar esto a listitems */}
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Tareas" />
                {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button component={Link} to="/tareasDiarias" className={classes.nested}>
                        <ListItemIcon>
                            <TodayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tareas Diarias" />
                    </ListItem>
                    <ListItem button component={Link} to="/rutinas" className={classes.nested}>
                        <ListItemIcon>
                            <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Rutinas" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button component={Link} to="/dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/novedadesPersonal">
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Personal" />
            </ListItem>
            {/* <ListItem button component={Link} to="/listadoAlmacen">
                <ListItemIcon>
                    <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary="Listado Almacen" />
            </ListItem> */}

        </List>
        <Divider />
        <List></List>
    </Drawer>
}
