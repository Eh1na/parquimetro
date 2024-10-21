
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

// src/pages/dashboard.js
const Dashboard = () => {
    return (
      <div>
        <h1>Panel de Control</h1>
        <p>Bienvenido al panel de control.</p>
        <Map/>
      </div>
    );
  };
  
  export default Dashboard;
  