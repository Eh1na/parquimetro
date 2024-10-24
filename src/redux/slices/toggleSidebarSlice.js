import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para el sidebar
const initialState = {
  isOpen: false,  // El sidebar está cerrado inicialmente
};

// Crear el slice
const toggleSidebarSlice = createSlice({
  name: 'sidebar',  // Nombre del slice
  initialState,
  reducers: {
    // Acción para alternar el estado del sidebar
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    // Acción para cerrar el sidebar
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    // Acción para abrir el sidebar
    openSidebar: (state) => {
      state.isOpen = true;
    },
  },
});

// Exportar las acciones generadas
export const { toggleSidebar, closeSidebar, openSidebar } = toggleSidebarSlice.actions;

// Exportar el reducer para agregarlo al store
export default toggleSidebarSlice.reducer;
