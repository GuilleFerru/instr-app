import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { DailyWorksContainer } from '../screens/DayliWorksContainer/DailyWorksContainer';

export const Router = () => {
    return <Switch>
        <Route exact path="/tareasDiarias">
            <DailyWorksContainer />
        </Route>
        <Route exact path="/dashboard">
            <Dashboard/>
        </Route>
    </Switch>
}
