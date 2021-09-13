import React from 'react'

export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                Pepito
            </span>
            
            <button className="btn btn-outline-warning">
                <i className="fas fa-sign-out-alt"></i>
                <span> Cerrar sesion</span>
            </button>
        </div>
    )
}
