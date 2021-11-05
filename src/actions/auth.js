import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { eventsClean } from './events';

export const startLoginEmailPassword = (email, password) => {
    return async(dispatch) => {

        const res = await fetchWithoutToken('auth/', {email, password}, 'POST');
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error ', body.msg, 'error')
        }

    }
}

export const login = (user) => ({

    type: types.authLogin,
    payload: user

});

export const startRegister = (email, password, name) => {
    return async(dispatch) => {

        const res = await fetchWithoutToken('auth/register/', {name, email, password}, 'POST');
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error ', body.msg, 'error')
        }

    }
}

export const startChecking = () => {
    return async(dispatch) => {
        //fetchWithToken
        const res = await fetchWithToken('auth/renew/');
        const body = await res.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            dispatch( finishChecking() );
        }

    }
}
export const finishChecking = () => ({
    type: types.authCheking
});

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());
        dispatch(eventsClean());

    }
};

export const logout = () => ({
    type: types.authLogout
});