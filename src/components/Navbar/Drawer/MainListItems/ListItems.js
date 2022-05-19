import React from 'react';
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core/";
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
// ]import { mainListActions } from "./MainListActions";


export const ListItems = ({ openList, handleClick, classes }) => {

  // const { handleLeaveRoom } = mainListActions();

  return (
    <>
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
          <ListItem button component={Link} to="/parosDePlanta" className={classes.nested}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Paros de Planta" />
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
    </>
  )
}





