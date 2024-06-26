import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../screens/Login/LoginContainer';
import { LayOut } from '../components/LayOut/LayOut';
import { DashboardContainer } from '../screens/Dashboard/DashboardContainer';
import { DailyWorksContainer } from '../screens/DailyWorks/DailyWorksContainer';
import { RoutineContainer } from '../screens/Routines/RoutinesSchedules/RoutineContainer';
import { ScheduleContainer } from '../screens/EmpDailySchedule/ScheduleContainer';
import { RoutineDetailsContainer } from '../screens/Routines/RoutinesDetails/RoutineDetailsContainer';
import { PlantShutdownListContainer } from '../screens/PlantShutdowns/PlantShutdownList/PlantShutdownListContainer';
import { PlantShutdownWorksContainer } from '../screens/PlantShutdowns/PlantShutdownWorks/PlantShutdownWorksContainer';
import { PlantShutdownWorksToDoContainer } from '../screens/PlantShutdowns/PlantShutdownWorksToDo/PlantShutdownWorksToDoContainer';
import { HolidayContainer } from '../screens/Holidays/HolidayContainer';
import { AuthContext } from '../context/AuthContext';
import { ErrorPage } from '../components/commonComponents/ErrorPage/ErrorPage';
import { StoreContainer } from '../screens/Store/StoreCodes/StoreContainer';
import { StoreReclaimsContainer } from '../screens/Store/StoreReclaims/StoreReclaimsContainer';
import { EmployeeContainer } from '../screens/Employess/EmployeeContainer';
import { StoreWorkshopContainer} from '../screens/Store/StoreWorkshop/StoreWorkshopContainer';

export const Router = () => {
    const { user } = useContext(AuthContext);
    return <Switch>
        <Route exact path="/">
            {user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/error">
            <ErrorPage error={'UPS ALGO EXPLOTO... Por favor volve a iniciar sesion'} />
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        {user ?
            <LayOut>
                <Route exact path="/tareasDiarias">
                    <DailyWorksContainer />
                </Route>
                <Route exact path="/rutinas/rutinasDetalles">
                    <RoutineDetailsContainer />
                </Route>
                <Route exact path="/rutinas">
                    <RoutineContainer />
                </Route>
                <Route exact path="/dashboard">
                    <DashboardContainer />
                </Route>
                <Route exact path="/novedadesPersonal">
                    <ScheduleContainer />
                </Route>
                <Route exact path="/parosDePlanta">
                    <PlantShutdownListContainer />
                </Route>
                <Route exact path="/parosDePlanta/tareasParoDePlantaSinAsignar">
                    <PlantShutdownWorksToDoContainer />
                </Route>
                <Route exact path="/parosDePlanta/tareasParoDePlanta">
                    <PlantShutdownWorksContainer />
                </Route>
                <Route exact path="/vacacionesPersonal">
                    <HolidayContainer />
                </Route>
                <Route exact path="/personal">
                    <EmployeeContainer />
                </Route>
                <Route exact path="/itemsAlmacen">
                    <StoreContainer />
                </Route>
                <Route exact path="/itemsTaller">
                    <StoreWorkshopContainer />
                </Route>
                <Route exact path="/reclamosStock">
                    <StoreReclaimsContainer />
                </Route>
            </LayOut>
            : <Login />}
    </Switch>
}
