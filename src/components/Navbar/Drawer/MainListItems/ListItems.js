import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { List } from "@material-ui/core";
import { DateContext } from '../../../../context/DateContext';
import { ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core/";
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
// ]import { mainListActions } from "./MainListActions";


export const ListItems = ({ openWorkList, handleClickWorkList, openEmpList, handleClickEmpList, classes }) => {

  // const { handleLeaveRoom } = mainListActions();
  const { handleRoutineDate } = useContext(DateContext);

  return (
    <>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={handleClickWorkList}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Tareas" />
        {openWorkList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openWorkList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/tareasDiarias" className={classes.nested}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Tareas Diarias" />
          </ListItem>
          <ListItem button onClick={() => handleRoutineDate(new Date())} component={Link} to="/rutinas" className={classes.nested}>
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
      <ListItem button onClick={handleClickEmpList}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="Personal" />
        {openEmpList ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openEmpList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/novedadesPersonal" className={classes.nested}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Parte diario" />
          </ListItem>
          <ListItem button component={Link} to="/vacacionesPersonal" className={classes.nested}>
            <ListItemIcon>
              <BeachAccessIcon />
            </ListItemIcon>
            <ListItemText primary="Vacaciones" />
          </ListItem>
        </List>
      </Collapse>
    </>
  )
}





