import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import jsPDF from 'jspdf';

const CobroEfectivoDialog = ({ visible, onHide, vehiculo, horaSalida, montoPago }) => {
    const [montoRecibido, setMontoRecibido] = useState('');
    const [vuelto, setVuelto] = useState(0);

    const calcularVuelto = () => {
        const recibido = parseFloat(montoRecibido) || 0;
        const vueltoCalculado = recibido - montoPago;
        setVuelto(vueltoCalculado > 0 ? vueltoCalculado : 0);
    };

    // Formatear hora de ingreso a solo HH:MM
    const horaIngresoFormateada = vehiculo.fechaHoraIngreso
        ? new Date(vehiculo.fechaHoraIngreso).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
          })
        : '';

    const generarBoleta = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Boleta de Cobro', 20, 20);
        doc.setFontSize(12);
        doc.text(`Patente: ${vehiculo.patente}`, 20, 40);
        doc.text(`Hora Ingreso: ${horaIngresoFormateada}`, 20, 50);
        doc.text(`Hora Salida: ${horaSalida}`, 20, 60);
        doc.text(`Monto a Pagar: $${montoPago}`, 20, 70);
        doc.text(`Monto Recibido: $${montoRecibido}`, 20, 80);
        doc.text(`Vuelto: $${vuelto}`, 20, 90);

        doc.save('boleta.pdf');
        setTimeout(()=>{onHide()},[3000])
    };

    return (
        <Dialog visible={visible} onHide={onHide} header="Cobro en Efectivo">
            <div className="field">
                <label htmlFor="patente">Patente</label>
                <InputText id="patente" value={vehiculo.patente} readOnly />
            </div>
            <div className="field">
                <label htmlFor="horaIngreso">Hora Ingreso</label>
                <InputText id="horaIngreso" value={horaIngresoFormateada} readOnly />
            </div>
            <div className="field">
                <label htmlFor="horaSalida">Hora Salida</label>
                <InputText id="horaSalida" value={horaSalida} readOnly />
            </div>
            <div className="field">
                <label htmlFor="montoPago">Monto a Pagar</label>
                <InputText id="montoPago" value={`$${montoPago}`} readOnly />
            </div>
            <div className="field">
                <label htmlFor="montoRecibido">Monto Recibido</label>
                <InputText
                    id="montoRecibido"
                    value={montoRecibido}
                    onChange={(e) => setMontoRecibido(e.target.value)}
                    onBlur={calcularVuelto}
                />
            </div>
           
                <div className="field">
                    <label htmlFor="vuelto">Vuelto</label>
                    <InputText id="vuelto" value={`$${vuelto}`} readOnly />
                </div>
          
            <div className="flex justify-content-evenly mt-4">
                <Button label="Cerrar" icon="pi pi-times" onClick={onHide} severity="danger" />
                <Button label="Generar Boleta" icon="pi pi-file" onClick={generarBoleta} severity="success" />
            </div>
        </Dialog>
    );
};

export default CobroEfectivoDialog;
