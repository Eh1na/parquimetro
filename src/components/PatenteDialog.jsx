import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const PatenteDialog = ({ visible, onHide, onSubmit }) => {
    const [patente, setPatente] = useState('');

    const handleSubmit = () => {
        const fechaHoraActual = new Date().toISOString(); // Formato ISO compatible
        onSubmit({ patente, fechaHoraIngreso: fechaHoraActual });
        setPatente('');
        onHide();
    };

    const handlerClose = () => {
        setPatente('');
        onHide();
    };

    return (
        <Dialog className='flex w-full' visible={visible} onHide={handlerClose} header="Ingresar Patente">
            <div className="flex w-full align-items-center justify-content-center">
                <InputText
                    className='w-full text-center text-4xl p-2 my-6 h-4rem'
                    id="patente"
                    value={patente}
                    onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        if (value.length <= 6) {
                            setPatente(value);
                        }
                    }}
                    placeholder="Patente del vehículo"
                />
            </div>
            <div className="flex mb-6">
                <label>Hora actual </label>
                <label>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</label>
            </div>
            <div className="flex justify-content-evenly">
                <Button label="Cancelar" icon="pi pi-times" onClick={handlerClose} severity="danger" />
                <Button label="Guardar" icon="pi pi-check" onClick={handleSubmit} severity="success" />
            </div>
        </Dialog>
    );
};

export default PatenteDialog;
