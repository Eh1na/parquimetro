
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Menubar } from 'primereact/menubar';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { toggleSidebar } from '@/redux/slices/toggleSidebarSlice';
import React, { useState, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';



const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);  // Obtener el estado del Sidebar

  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const btnRef4 = useRef(null);

  const handlerToggle =()=>{dispatch(toggleSidebar())}

  // Elementos del Menubar
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => router.push('/'),  // Navegar a la página principal
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-th-large',
      command: () => router.push('/dashboard'),  // Navegar al Dashboard
    },
    {
      label: 'About',
      icon: 'pi pi-info-circle',
      command: () => router.push('/about'),  // Navegar a la página "About"
    },
  ];

  return (
    <div>
      {/* Menubar de PrimeReact */}
     
        <Menubar
            className="w-full z-2 flex align-items-center justify-content-between p-3 surface-section"

            model={items}
            start={<Button icon="pi pi-bars" onClick={() => dispatch(toggleSidebar())} />}  // Botón para abrir el Sidebar
        />
    

      {/* Sidebar de PrimeReact */}
      <Sidebar
                visible={isSidebarOpen}
                onHide={() => dispatch(toggleSidebar())}
                content={({ closeIconRef, hide }) => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '100%' }}>
                            <div className="flex flex-column h-full">
                                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                    <span className="inline-flex align-items-center gap-2">
                                        
                                        <span className="font-semibold text-2xl text-primary">Parquimetro App</span>
                                    </span>
                                    <span>
                                        <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                                    </span>
                                </div>
                                <div className="overflow-y-auto">
                                    <ul className="list-none p-3 m-0">
                                        <li>
                                            <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef1} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                    <span className="font-medium">APP</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <Link href="/dashboard" onClick={()=>handlerToggle()} className="no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-home mr-2"></i>
                                                        <span className="font-medium">Dashboard</span>
                                                        <Ripple />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/gestionParquimetro" onClick={()=>handlerToggle()} className="no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-car mr-2"></i>
                                                        <span className="font-medium">Parquimetro</span>
                                                        <Ripple />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="list-none p-3 m-0">
                                        <li>
                                            <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef4} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                    <span className="font-medium">Configuracion</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-users mr-2"></i>
                                                        <span className="font-medium">Usuarios</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-auto">
                                    <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                                    <a v-ripple className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <Avatar image="https://cdn-icons-png.flaticon.com/512/3143/3143160.png" shape="circle" />
                                        <span className="font-bold">Operador 1</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>

      {/* Contenido principal */}
      <main>{children}</main>

      {/* Pie de página */}
      <footer>
        <p>© 2024 Grupo 1. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
