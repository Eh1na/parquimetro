import "@/styles/globals.css";
import 'primereact/resources/themes/saga-blue/theme.css';   // Tema de PrimeReact (puedes elegir otro tema si lo prefieres)
import 'primereact/resources/primereact.min.css';           // Estilos principales de PrimeReact
import 'primeicons/primeicons.css';                         // Iconos de PrimeIcons
import 'primeflex/primeflex.css';                           // PrimeFlex para layout y utilidades

import { Provider } from 'react-redux';
import store from "@/redux/store";
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Excluir la página de login del layout
  const noLayoutPages = ['/login'];  // Aquí puedes agregar más rutas si es necesario

  const isLayoutNeeded = !noLayoutPages.includes(router.pathname); // Verificar si la ruta actual necesita layout

  return (
    <Provider store={store}>
      {isLayoutNeeded ? (
        
          <Layout>
            <Component {...pageProps} />
          </Layout>
        
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

export default MyApp;

