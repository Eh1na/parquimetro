import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import CobroEfectivoDialog from './CobroEfectivoDialog'; // Importar el nuevo componente

const SalidaDialog = ({ visible, onHide, vehiculo, onSubmit }) => {
    const [horaSalida, setHoraSalida] = useState('');
    const [montoPago, setMontoPago] = useState(0);
    const [metodoPago, setMetodoPago] = useState(null);
    const [mostrarCobroEfectivo, setMostrarCobroEfectivo] = useState(false);
    const tarifaPorMinuto = 15; // Tarifa por minuto en pesos

    const opcionesPago = [
        { label: 'Efectivo', value: 'efectivo' },
        { label: 'Débito/Crédito', value: 'debito_credito', disabled: true },
    ];

    useEffect(() => {
        if (visible && vehiculo) {
            try {
                const ahora = new Date();
                const horaSalidaFormateada = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                setHoraSalida(horaSalidaFormateada);

                const horaIngreso = new Date(vehiculo.fechaHoraIngreso);
                if (isNaN(horaIngreso.getTime())) {
                    throw new Error('Fecha de ingreso inválida');
                }

                const diferenciaMilisegundos = ahora - horaIngreso;
                const diferenciaMinutos = Math.ceil(diferenciaMilisegundos / (1000 * 60)); // Diferencia en minutos
                setMontoPago(diferenciaMinutos * tarifaPorMinuto);
            } catch (error) {
                console.error('Error al calcular el monto a pagar:', error);
                setMontoPago(0);
            }
        }
    }, [visible, vehiculo]);

    const handlePagar = () => {
        if (metodoPago === 'efectivo') {
            setMostrarCobroEfectivo(true);
            onHide();
        }
    };

    return (
        <>
            <Dialog visible={visible} onHide={onHide} header="Registrar Salida del Vehículo">
                <div className="field">
                    <label htmlFor="patente">Patente</label>
                    <InputText id="patente" value={vehiculo?.patente || ''} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="fechaHoraIngreso">Hora Ingreso</label>
                    <InputText
                        id="fechaHoraIngreso"
                        value={
                            vehiculo?.fechaHoraIngreso
                                ? new Date(vehiculo.fechaHoraIngreso).toLocaleTimeString('es-ES', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                  })
                                : ''
                        }
                        readOnly
                    />
                </div>
                <div className="field">
                    <label htmlFor="fechaHoraSalida">Hora Salida</label>
                    <InputText id="fechaHoraSalida" value={horaSalida} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="montoPago">Monto a Pagar</label>
                    <InputText id="montoPago" value={`$${montoPago}`} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="metodoPago">Método de Pago</label>
                    <Dropdown
                        id="metodoPago"
                        value={metodoPago}
                        options={opcionesPago}
                        onChange={(e) => setMetodoPago(e.value)}
                        placeholder="Seleccionar método de pago"
                        className="w-full"
                    />
                </div>
                <div className="flex justify-content-evenly mt-4">
                    <Button label="Cancelar" icon="pi pi-times" onClick={onHide} severity="danger" />
                    <Button
                        label="Pagar"
                        icon="pi pi-check"
                        onClick={handlePagar}
                        severity="success"
                        disabled={!metodoPago}
                    />
                </div>
            </Dialog>

            {/* Dialogo de cobro efectivo */}
            {mostrarCobroEfectivo && (
                <CobroEfectivoDialog
                    visible={mostrarCobroEfectivo}
                    onHide={() => setMostrarCobroEfectivo(false)}
                    vehiculo={vehiculo}
                    horaSalida={horaSalida}
                    montoPago={montoPago}
                />
            )}
        </>
    );
};

export default SalidaDialog;
