// src/pages/login.jsx
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; // Importar el componente Dialog
import { Message } from 'primereact/message';
import { FloatLabel } from "primereact/floatlabel";

const MapLogin = dynamic(() => import('@/components/MapLogin'), { ssr: false });

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Guardar el id y nombre en el localStorage
        localStorage.setItem('id', data.id);
        localStorage.setItem('nombre', data.nombre);

        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message); // Mostrar mensaje de error
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center w-full h-screen bg-primary">
      {/* Botón fijo para abrir el modal */}
      <div className="fixed z-5 top-0 right-0 w-10rem p-3">
        <Button label="Ingresar" icon="pi pi-sign-in" className="p-button-raised md:bg-primary bg-primary-reverse" onClick={() => setVisible(true)} />
      </div>

      {/* Modal del formulario de login */}
      <Dialog 
        header="Iniciar sesión" 
        visible={visible} 
        onHide={() => setVisible(false)}
        dismissableMask // Permite cerrar el modal al hacer clic fuera
        draggable={false}
      >
        <div className="p-fluid m-2">
          <div className="field m-3">
            <FloatLabel>
              <InputText 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <label htmlFor="username">Usuario</label>
            </FloatLabel>
          </div>
          <div className="field m-3 mt-5">
            <FloatLabel>
              <Password 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                toggleMask 
                feedback={false}
              />
              <label htmlFor="password">Contraseña</label>
            </FloatLabel>
          </div>
          {error && <Message severity="error" text={error} className="mt-3 w-6 m-auto" />}
          <div className="mt-4 flex justify-content-center">
            <Button 
              label="Ingresar" 
              icon="pi pi-check" 
              className="w-auto" 
              onClick={handleLogin} 
            />
          </div>
        </div>
      </Dialog>

      {/* Mapa */}
      <MapLogin />
    </div>
  );
};

export default Login;
