import "@/styles/globals.css";

import 'primereact/resources/themes/saga-blue/theme.css';   // Tema de PrimeReact (puedes elegir otro tema si lo prefieres)
import 'primereact/resources/primereact.min.css';           // Estilos principales de PrimeReact
import 'primeicons/primeicons.css';                         // Iconos de PrimeIcons
import 'primeflex/primeflex.css';                           // PrimeFlex para layout y utilidades





export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
