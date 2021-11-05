import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLoginEmailPassword, startRegister } from '../../actions/auth';

import { useForm } from '../../hooks/useForm';
import './loginRegister.css';

export const LoginRegisterScreen = () => {

    const [loginValues, handleLoginInputChange] = useForm({
        loginEmail: '',
        loginPassword: ''
    });

    const [registerValues, handleRegisterInputChange] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: ''
    });

    const {loginEmail, loginPassword} = loginValues;
    const {registerName, registerEmail, registerPassword, registerPassword2} = registerValues;

    const dispatch = useDispatch();

    const handleLoginSubmit = (e) => {

        e.preventDefault();

        dispatch( startLoginEmailPassword(loginEmail, loginPassword) );

    }

    const handleRegisterSubmit = (e) => {

        e.preventDefault();

        if (registerPassword !== registerPassword2) {
            
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');

        }
        
        dispatch(startRegister(registerEmail, registerPassword, registerName));
        
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
