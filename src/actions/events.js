import { types } from "../types/types";

export const eventAddNew = (event) => ({
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

export const eventUpdated = (event) => ({
    type: types.updatedEvent,
    payload: event
})

export const eventDeleted = () => ({
    type: types.deletedEvent
})