import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const VehiculosTable = ({ vehiculos, onSalida, onReportar, onEliminar }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredVehiculos, setFilteredVehiculos] = useState(vehiculos);

    // Detecta cambios en el tamaño de la pantalla para mostrar/ocultar columnas
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        handleResize(); // Comprobar el tamaño inicial
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Filtra los vehículos por patente y estado cuando es pantalla pequeña
    useEffect(() => {
        const filtered = vehiculos.filter((vehiculo) => 
            vehiculo.patente.toLowerCase().includes(globalFilter.toLowerCase()) &&
            (!isSmallScreen || vehiculo.estado === 'Ingresado')
        );
        setFilteredVehiculos(filtered);
    }, [globalFilter, isSmallScreen, vehiculos]);

    const accionesTemplate = (rowData) => {
        return (
            <div className='flex w-10 flex-wrap gap-2'>
                <Button label="Salida" className="w-12" onClick={() => onSalida(rowData)} severity='success'/>
                <Button label="Reportar" className="w-12" onClick={() => onReportar(rowData)} severity='warning'/>
                {isSmallScreen ? null : <Button label="Eliminar" className="p-button-danger" onClick={() => onEliminar(rowData)}/>}
            </div>
        );
    };

    return (
        <div>
            {/* Filtro de búsqueda por patente */}
            <div className="p-inputgroup mb-3 w-10 ml-2">
                <span className="p-inputgroup-addon">Buscar</span>
                <InputText 
                    placeholder="Por patente" 
                    value={globalFilter} 
                    onChange={(e) => setGlobalFilter(e.target.value)} 
                />
            </div>

            <DataTable value={filteredVehiculos} paginator rows={isSmallScreen ? 2 : 10} 
                sortField="fechaHoraIngreso" sortOrder={1} /* Ordenación por fechaHoraIngreso ascendente por defecto */
                className='w-12'
                emptyMessage='sin datos'
            >
                <Column field="idVaucher" header="ID Vaucher" hidden={isSmallScreen} />
                <Column field="patente" header="Patente" />
                <Column field="fechaHoraIngreso" header="Fecha/Hora Ingreso" sortable />
                <Column field="fechaHoraSalida" header="Fecha/Hora Salida" hidden={isSmallScreen} />
                <Column field="estado" header="Estado" hidden={isSmallScreen} />
                <Column body={accionesTemplate} header="Acciones" />
            </DataTable>
        </div>
    );
};

export default VehiculosTable;
