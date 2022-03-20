import React from "react";
import { Link } from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core/";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
// import AllInboxIcon from '@material-ui/icons/AllInbox';
import ScheduleIcon from '@material-ui/icons/Schedule';

// no esta funcionando, esta todo el DrawerContainer....

export const listItems = (
  <div>
    <ListItem button component={Link} to="/tareasDiarias">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Tareas Diarias" />
    </ListItem> 
    <ListItem button component={Link} to="/rutinas">
      <ListItemIcon>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Rutinas" />
    </ListItem> 
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
  </div>
)


