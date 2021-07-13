import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { DailyWorksContainer } from '../screens/DayliWorksContainer/DayliWorksContainer';

export const Router = () => {
    return <Switch>
        <Route exact path="/">
            <Dashboard />
        </Route>
        <Route exact path="/tareas-diarias">
            <DailyWorksContainer/>
        </Route>
    </Switch>
}
