import React, { useState } from 'react';
import { ListItems } from './MainListItems/ListItems';
import { Logout } from '../../Logout/Logout';
import clsx from "clsx";
import { makeStyles, Drawer, List, Divider, IconButton } from "@material-ui/core";
import { drawerContainerStyle } from './DrawerContainerStyle';
import { LogoNavbar } from '../LogoNavbar';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";


const useStyles = makeStyles((theme) => drawerContainerStyle(theme));


export const DrawerContainer = ({ handleDrawerClose, open }) => {

    const classes = useStyles();
    const [openWorkList, setOpenWorkList] = useState(false);
    const [openEmpList, setOpenEmpList] = useState(false);
    const [openStoreList, setOpenStoreList] = useState(false);

    const handleClickWorkList = () => {
        setOpenWorkList(!openWorkList);
    };

    const handleClickEmpList = () => {
        setOpenEmpList(!openEmpList);
    }

    const handleClickStoreList = () => {
        setOpenStoreList(!openStoreList);
    }

    return <Drawer
        variant="permanent"
        classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }}
        open={open}
    >
        <div className={classes.toolbarIcon}>
            <LogoNavbar linkTo={"/"} />
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <List>
            <ListItems
                openWorkList={openWorkList}
                handleClickWorkList={handleClickWorkList}
                openEmpList = {openEmpList}
                handleClickEmpList = {handleClickEmpList}
                openStoreList = {openStoreList}
                handleClickStoreList = {handleClickStoreList}
                classes={classes}
            />
        </List>
        <Divider />
        <List>
            <Logout />
        </List>
    </Drawer>
}
