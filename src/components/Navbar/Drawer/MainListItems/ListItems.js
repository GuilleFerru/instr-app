import React from "react";
import { Link } from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core/";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';

export const listItems = (
  <div>
    <ListItem button component={Link} to="/tareasDiarias">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Tareas Diarias" />
    </ListItem> 
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Personal" />
    </ListItem>
  </div>
)


