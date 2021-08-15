import React from 'react'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { appBarContainerStyle } from './AppBarContainerStyle';
import { Title } from '../../commonComponents/Title';
import { DateTime } from '../../DateTime/DateTime'
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => appBarContainerStyle(theme));

export const AppBarContainer = ({ handleDrawerOpen, open }) => {
    const classes = useStyles({green:green});

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
            <Box className={classes.toolbarContent}>
                <Title
                    component={'h1'}
                    variant={'h6'}
                    color={'inherit'}
                    value={'INSTRUMENTOS PR3'}
                />
                {/* <Title
                    component={'h1'}
                    variant={'h6'}
                    color={'inherit'}
                    value={seccionName}
                /> */}
                <DateTime />
            </Box>
        </Toolbar>
    </AppBar>
}


