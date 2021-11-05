//Documentacion react-big-calendar https://www.npmjs.com/package/react-modal

import React, { useEffect, useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { NavBar } from '../ui/NavBar';
import { CalendarEvent } from './CalendarEvent';
import { messages } from '../../helpers/calendar-messages';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, startEventsLoad } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        
        dispatch( startEventsLoad() );

    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) => {
        
        setLastView(e);
        localStorage.setItem('lastView', e);
    
    }


    // Si seleccionamos cualquier espacio de el calendario sin eventos, quitamos el activeEvent !
    const onSelectSlot = (e) => {
        
        dispatch( eventClearActive() );

    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return{
            style
        }
    }

    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot= {onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                (activeEvent) && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
