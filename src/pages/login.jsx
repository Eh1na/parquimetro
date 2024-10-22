// src/pages/login.jsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { FloatLabel } from "primereact/floatlabel";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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
    <div className="flex justify-content-center align-items-center bg-primary w-full h-screen" >
      <div className="p-card p-shadow-5 w-10 h-30rem md:w-4 md:h-22rem p-5 flex justify-content-center align-items-center flex-wrap">
        <h1 className="text-center w-full">Parquimetro Web App</h1>
        
        {/* Mostrar mensaje de error si existe */}
        {error && <Message severity="error" text={error} className="p-mb-3" />}
        

        <div className='w-12 flex justify-content-center align-items-center mb-5 mt-5'>
          <FloatLabel>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="username">Usuario</label>
          </FloatLabel>
        </div>

        <div className='w-12 flex justify-content-center align-items-center mb-5'>
          <FloatLabel>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}  // Desactivar feedback visual
            />
            <label htmlFor="password">Contraseña</label>
          </FloatLabel>
        </div>
        
        
        <Button label="Ingresar" icon="pi pi-sign-in" onClick={handleLogin} className="mb-5" />

      </div>
    </div>
  );
};

export default Login;
