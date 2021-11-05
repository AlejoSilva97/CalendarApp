import Swal from "sweetalert2";

import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const startEventAddNew = (event) => {
    return async(dispatch, getState) => {
        const {uid, name} = getState().auth;
        
        try {

            const res = await fetchWithToken('events/create/', event, 'POST');
            const body = await res.json();

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                
                dispatch( eventAddNew(event) );
            }

        } catch (err) {

            console.log(err);

        }

    }
}

const eventAddNew = (event) => ({
    type: types.addNewEvent,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.setActiveEvent,
    payload: event
})

export const eventClearActive = () => ({
    type: types.clearActiveEvent
})

export const startEventUpdate = (event) => {
    return async(dispatch) => {

        try {
            
            const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await res.json();

            if (body.ok) {
                dispatch( eventUpdated(event) );
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (err) {
            console.log(err);
        }

    }
}

const eventUpdated = (event) => ({
    type: types.updatedEvent,
    payload: event
})

export const startEventDelete = () => {
    return async(dispatch, getState) => {

        const {activeEvent} = getState().calendar;

        try {
            
            const res = await fetchWithToken(`events/delete/${activeEvent.id}`, {}, 'DELETE');
            const body = await res.json();

            if (body.ok) {
                dispatch( eventDeleted() );
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (err) {
            console.log(err);
        }

    }
}

export const eventDeleted = () => ({
    type: types.deletedEvent
})

export const startEventsLoad = () => {
    return async(dispatch) => {

        const res = await fetchWithToken('events/');
        const body = await res.json();

        if (body.ok) {

            const events = prepareEvents(body.events); 

            dispatch(eventsLoad(events));

        }

    }
}

const eventsLoad = (events) => ({
    type: types.loadedEvents,
    payload: events
});

export const eventsClean = () => ({
    type: types.logoutCleanEvents
})