
//Nombres de las acciones a ejecutar 
export const types = {

    //ui types
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    //calendar types
    startAddNewEvent: '[calendar] Start add new event',
    addNewEvent: '[calendar] Add New Event',
    setActiveEvent: '[calendar] Active Event',
    clearActiveEvent: '[calendar] Clear Active Event',
    updatedEvent: '[calendar] Event Updated',
    deletedEvent: '[calendar] Event Deleted',
    loadedEvents: '[calendar] Loaded events',
    logoutCleanEvents: '[calendar] Clean events',

    //auth types
    authCheking: '[auth] checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Register',
    authStartTokenRenew: '[auth] Token renew',
    authLogout: '[auth] Logout'

}