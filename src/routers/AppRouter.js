import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { LoginRegisterScreen } from '../components/auth/LoginRegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';



export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={LoginRegisterScreen} />

                    <Route exact path="/" component={CalendarScreen } />

                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}
