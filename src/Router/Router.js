import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { DailyWorksContainer } from '../screens/DailyWorks/DailyWorksContainer';
import { EmpDailyScheduleContainer } from '../screens/EmpDailySchedule/EmpDailyScheduleContainer';
import { StoreListContainer } from '../screens/StoreList/StoreListContainer';

export const Router = () => {
    return <Switch>
        <Route exact path="/novedadesPersonal">
            <EmpDailyScheduleContainer />
        </Route>
        <Route exact path="/dashboard">
            <Dashboard/>
        </Route>
        <Route exact path="/tareasDiarias">
            <DailyWorksContainer/>
        </Route>
        <Route exact path="/listadoAlmacen">
            <StoreListContainer/>
        </Route>
    </Switch>
}
