import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { DailyWorksContainer } from '../screens/DailyWorks/DailyWorksContainer';
import { RoutineContainer } from '../screens/Routines/RoutineContainer';
import { ScheduleContainer } from '../screens/EmpDailySchedule/ScheduleContainer';
import { RoutineDetailsContainer } from '../screens/Routines/RoutinesDetails/RoutineDetailsContainer';
import { StoreListContainer } from '../screens/StoreList/StoreListContainer';

export const Router = () => {
    return <Switch>
        <Route exact path="/tareasDiarias">
            <DailyWorksContainer />
        </Route>
        <Route exact path="/rutinasDetalles">
            <RoutineDetailsContainer />
        </Route>
        <Route exact path="/rutinas">
            <RoutineContainer />
        </Route>
        <Route exact path="/dashboard">
            <Dashboard />
        </Route>
        <Route exact path="/novedadesPersonal">
            <ScheduleContainer />
        </Route>
        <Route exact path="/listadoAlmacen">
            <StoreListContainer />
        </Route>
    </Switch>
}
