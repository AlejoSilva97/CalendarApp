import { types } from '../types/types';

// {
//     id: new Date().getTime(),
//     title: 'Graduacion SENA',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Terminar el curso yaaaaa!',
//     user:{
//         _id: '123',
//         name: 'Alejandro'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case types.setActiveEvent:

            return {
                ...state,
                activeEvent: action.payload
            }

        case types.clearActiveEvent:

            return {
                ...state,
                activeEvent: null
            }

        case types.addNewEvent:

            return {
                ...state,
                events: [
                    ...state.events, 
                    action.payload
                ]
            }

        case types.updatedEvent:

        return {
            ...state,
            events: state.events.map(
                (event) => (event.id === action.payload.id) ? action.payload : event
            )
        }

        case types.deletedEvent:

        return {
            ...state,
            events: state.events.filter(
                event => (event.id !== state.activeEvent.id)
            ),
            activeEvent: null
        }

        case types.loadedEvents:

            return {
                ...state,
                events: [...action.payload]
            }

        case types.logoutCleanEvents:

        return {
            ...initialState
        }

        default:
            return state;
    }

}