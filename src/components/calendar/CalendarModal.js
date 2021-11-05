//Documentacion react-modal https://www.npmjs.com/package/react-modal
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import moment from 'moment';

import { uiCloseModal } from '../../actions/ui';
import { eventClearActive, startEventAddNew, startEventUpdate } from '../../actions/events';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
  
Modal.setAppElement('#root');

//Valor (fecha inicial) inicial de el componente datePicker
const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowplusone = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowplusone.toDate()
};

export const CalendarModal = () => {

    //State de los campos de fecha, "Picker"
    const [dateStart, setdateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowplusone.toDate() );

    const [titleValid, setTitleValid] = useState(true);

    //Tambien podria utilizar mi hook useForm pero es para no perder practica sobre como funciona
    const [formValues, setFormValues] = useState(initEvent);

    const {title, notes, start, end} = formValues;

    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent);
        }else{
            setFormValues(initEvent);
        }

    }, [activeEvent, setFormValues]);

    const handleInputChange = ({target}) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

    }

    const handleSubmitForm = (e) => {

        e.preventDefault();

        //Convertimos nuestras fechas de javascript en instancias de moment para trabajar con ellas
        const momentStart = moment(start);
        const momentEnd = moment(end);

        //Si la fecha inicial es igual o posterior a la fecha final....
        if ( momentStart.isSameOrAfter(momentEnd) ) {
            Swal.fire('Error','La fecha fin debe ser posterior a la fecha de inicio', 'error');
            return;
        }

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        //Aqui falta grabar en la bd
        if (activeEvent) {

            dispatch( startEventUpdate(formValues) );
            
        } else {

            dispatch( startEventAddNew(formValues) );
            
        }
        

        setTitleValid(true);
        closeModal();

    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch( eventClearActive() );
        setFormValues( initEvent );
    }

    const handleStartDateChange = (e) => {
        setdateStart(e);
        
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }
    

    return (
        
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >

            <h1>{ activeEvent ? 'Editar evento' : 'Nuevo evento' }</h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        className="form-control"
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid' }`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
        
    )
}
