import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { startChecking } from '../actions/auth';
import { LoginRegisterScreen } from '../components/auth/LoginRegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';



export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
        
        dispatch(startChecking());

    }, [dispatch])

    if(checking){
        return <div
            className="loader-div"
        >
            <h3>Por favor espere...</h3>
        </div>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={LoginRegisterScreen} 
                        isAuth={!!uid}
                    />

                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={CalendarScreen } 
                        isAuth={!!uid}    
                    />

                    <Redirect to="/login" />
                </Switch>
            </div>
        </Router>
    )
}
