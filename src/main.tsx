/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
  



import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaPokemons } from './componentsPokemon.tsx/ListaPokemons.tsx'; // Tu componente
import { Detalle } from './componentsPokemon.tsx/Detalle.tsx'; // Necesitas crear este componente

// Componente principal que manejará las rutas


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
       <App />

    <Detalle/>
    </BrowserRouter>
 
  </StrictMode>,
)

 */

// index.tsx o main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListaPokemons } from './componentsPokemon.tsx/ListaPokemons'; // Tu componente
import { Detalle } from './componentsPokemon.tsx/Detalle'; // Necesitas crear este componente

// Componente principal que manejará las rutas
const App = () => (
  <Routes>
    {/* Ruta principal para mostrar la lista de Pokémon */}
    <Route path="/" element={<ListaPokemons />} /> 
    
    {/* Ruta dinámica para mostrar los detalles de un Pokémon */}
    {/* Usamos ':nombre' para indicar un parámetro variable en la URL */}
    <Route path="/pokemon/:nombre" element={<Detalle />} /> 
  </Routes>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ListaPokemons/>
    </BrowserRouter>
  </React.StrictMode>
);