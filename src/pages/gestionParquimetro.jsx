import React, { useState } from 'react';
import PatenteDialog from '@/components/PatenteDialog';  // Importamos el componente del diálogo
import VehiculosTable from '@/components/VehiculosTable'; // Importamos el componente de la tabla
import { Button } from 'primereact/button';

const GestionParquimetro = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);

    const agregarVehiculo = (vehiculo) => {
        setVehiculos([...vehiculos, { ...vehiculo, idVaucher: vehiculos.length + 1, estado: 'Ingresado' }]);
    };

    const marcarSalida = (vehiculo) => {
        const updatedVehiculos = vehiculos.map(v => 
            v.idVaucher === vehiculo.idVaucher ? { ...v, fechaHoraSalida: new Date().toLocaleString(), estado: 'Salido' } : v
        );
        setVehiculos(updatedVehiculos);
    };

    const reportarVehiculo = (vehiculo) => {
        alert(`Reportar vehículo con patente: ${vehiculo.patente}`);
    };

    const eliminarVehiculo = (vehiculo) => {
        setVehiculos(vehiculos.filter(v => v.idVaucher !== vehiculo.idVaucher));
    };

    return (
        <div className="gestion-parquimetro">
            {/* Botón para abrir el diálogo de ingreso de patente */}
            <Button className='ml-2 mb-2 mt-2' label="Ingresar Vehículo" icon="pi pi-plus" onClick={() => setDialogVisible(true)} />

            {/* Componente de diálogo para ingresar la patente */}
            <PatenteDialog
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                onSubmit={agregarVehiculo}
            />

            {/* Componente de la tabla que muestra los vehículos ingresados */}
            <VehiculosTable 
                vehiculos={vehiculos}
                onSalida={marcarSalida}
                onReportar={reportarVehiculo}
                onEliminar={eliminarVehiculo}
            />
        </div>
    );
};

export default GestionParquimetro;

