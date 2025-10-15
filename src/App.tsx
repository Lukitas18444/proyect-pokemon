
import { Routes, Route } from 'react-router-dom';
import NavLayout from './components/Nav.tsx';
import {ListaPokemons} from './componentsPokemon.tsx/ListaPokemons.tsx'; 
import {Detalle }from './componentsPokemon.tsx/Detalle.tsx'; 
import { RandomPokemon } from './componentsPokemon.tsx/RandomPokemon.tsx';

import './index.css'

const App = () => (
  
    <Routes>
        <Route path="/" element={<NavLayout />}> 

            <Route index element={<RandomPokemon />} /> 
            

            <Route path="/ListaPokemons" element={<ListaPokemons />} /> 

            <Route path="pokemon/:nombre" element={<Detalle />} /> 
            
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Route>
    </Routes>
);

export default App;