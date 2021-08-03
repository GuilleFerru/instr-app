import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { EmpDailyScheduleContainer } from '../screens/EmpDailySchedule/EmpDailyScheduleContainer';

export const Router = () => {
    return <Switch>
        <Route exact path="/tareasDiarias">
            <EmpDailyScheduleContainer />
        </Route>
        <Route exact path="/dashboard">
            <Dashboard/>
        </Route>
    </Switch>
}
