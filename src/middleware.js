// src/middleware.js
import { NextResponse } from 'next/server';

// Definir las rutas que queremos proteger
const protectedRoutes = ['/dashboard', '/profile','/','/*'];

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('authToken'); // Obtener token de autenticación de las cookies

  // Verificar si la ruta es protegida
  if (protectedRoutes.includes(url.pathname)) {
    // Si el usuario no tiene token, redirigir al login
    if (!token) {
      url.pathname = '/login'; // Redirigir a la página de login
      return NextResponse.redirect(url);
    }
  }

  // Permitir el acceso si el usuario está autenticado o la ruta no es protegida
  return NextResponse.next();
}
