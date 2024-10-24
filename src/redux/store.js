import { configureStore } from '@reduxjs/toolkit';
import toggleSidebarReducer from './slices/toggleSidebarSlice';  // Importar el reducer

const store = configureStore({
  reducer: {
    sidebar: toggleSidebarReducer,  // Agregar el slice del sidebar
    // Puedes agregar más reducers aquí si es necesario
  },
});

export default store;
