import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../index.css'

interface PokemonResult {
    id: number;
    name: string;
    url?: string;
    spriteUrl?: string; 
    weight ?: number;
    pokemon:string
}



export const ListaPokemons = () => {
     const navigate = useNavigate();

    const [listaPokemon, setListaPokemon] = useState<PokemonResult[]>([]);

    const [estaCargando, setEstaCargando] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [filtroNombre, setFiltroNombre] = useState('');

    
    const [offset, setOffset] = useState(0);
    

    const limit = 20;
    
    const buscadorPokemon = async (currentOffset: number) => {
        setEstaCargando(true);
        setError(null);
        try {

            const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`;
            const respuesta = await fetch(url);
            
            if (!respuesta.ok) {
                throw new Error(`¡Error HTTP! estado: ${respuesta.status}`);
            }
            
            const datos = await respuesta.json();
            const informacion = datos.results
            
            const promesasDetalle = informacion.map((pokemon: PokemonResult) => 
            fetch(pokemon.url) 
                .then(res => res.json())
                .then(datosDetalle => ({
                    name: pokemon.name,
                    url: pokemon.url,
                    spriteUrl: datosDetalle.sprites.front_default, 
                    weight: datosDetalle.weight,
                    id:datosDetalle.id,
                }))
        );

        const listaCompleta = await Promise.all(promesasDetalle);


            if (currentOffset === 0) {
                setListaPokemon(listaCompleta);
            } else {
                setListaPokemon(prevLista => [...prevLista, ...listaCompleta]);
            }

        } catch (err) {
            const mensaje = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
            setError(`Fallo al buscar Pokémon: ${mensaje}`);
            console.error(err);
        } finally {
            setEstaCargando(false);
        }
    };

    useEffect(() => {
        buscadorPokemon(0);
    }, []); 


    const manejarClickDetalles = (pokemonName: string) => {
        navigate(`/pokemon/${pokemonName}`);
    };

    const manejarBusqueda = () => {

        const nombreLimpio = filtroNombre.trim().toLowerCase().replace(/\s/g, '');
        
        
        if (nombreLimpio) {
            navigate(`/pokemon/${nombreLimpio}`);
        } else {
            alert('Por favor, ingresa un nombre de Pokémon para buscar.');
        }
    };

    const manejarMostrarMas = () => {
        const nuevoOffset = offset + limit;
        setOffset(nuevoOffset); 
        buscadorPokemon(nuevoOffset); 
    };
    
    return (
        <div className='container-lista'>
               
            <h2>Lista de Pokémon</h2>

            <div>
                <input 
                    type="text"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                    placeholder="Buscar Pokémon por nombre..."  
                    disabled={estaCargando}
                />
                
                <button 
                    onClick={manejarBusqueda} 
                    disabled={estaCargando}
                >
                    Buscar
                </button>
            </div>

            {!estaCargando && listaPokemon.length > 0 && (
                <ul>
                    {listaPokemon.map((pokemon) => (
                        <button onClick={() => manejarClickDetalles(pokemon.name)} >
                        <li key={pokemon.name} className='item-pokemon'>
                            <p>N°: {pokemon.id} </p>
                            <strong>{pokemon.name}</strong> 
                            <img 
                            src={pokemon.spriteUrl} 
                            alt={`Imagen de ${pokemon.name}`} 
                            style={{ width: '150px', height: '150px' }}
                            />
                            <p> Peso: {pokemon.weight} </p>
                        </li>
                        </button>

                    ))}
                </ul>
            )}

            <div >
                    <button 
                        onClick={manejarMostrarMas} 
                        disabled={estaCargando}
                    >
                        {estaCargando ? 'Cargando...' : 'Mostrar Más'}
                    </button>
            </div>


            {!estaCargando && listaPokemon.length === 0 && !error && (
                <p>Haz clic en el botón para cargar los primeros 20 Pokémon.</p>
            )}
        </div>
    );
};


