
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

// src/pages/dashboard.js
const Dashboard = () => {
    return (
      <div>
        <Map/>
      </div>
    );
  };
  
  export default Dashboard;
  