import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface PokemonResult {
    name: string;
    url: string;
}



export const ListaPokemons = () => {
     const navigate = useNavigate();

    const [listaPokemon, setListaPokemon] = useState<PokemonResult[]>([]);

    const [estaCargando, setEstaCargando] = useState(false);

    const [error, setError] = useState<string | null>(null);



    const base_url = `https://pokeapi.co/api/v2/pokemon`;


    const buscarPokemon = async () => {
        setEstaCargando(true);
        setError(null);
        try {
        
            const respuesta = await fetch(base_url);
            
            if (!respuesta.ok) {
                throw new Error(`¡Error HTTP! estado: ${respuesta.status}`);
            }
            
            const datos = await respuesta.json();
          
            setListaPokemon(datos.results);
        } catch (err) {
          
            const mensaje = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
            setError(`Fallo al buscar Pokémon: ${mensaje}`);
            console.error(err);
        } finally {
        
            setEstaCargando(false);
        }
          
    };

    const manejarClickDetalles = (pokemonName: string) => {
        navigate(`/pokemon/${pokemonName}`);
    };

    
    return (
        <div>
            <button onClick={buscarPokemon}>Buscar</button>
            
            <h2>Lista de Pokémon</h2>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {estaCargando && <p>Cargando Pokémon...</p>}

            {!estaCargando && listaPokemon.length > 0 && (
                <ul>
                    {listaPokemon.map((pokemon) => (
                        <li key={pokemon.name}>
                            <strong>{pokemon.name}</strong> 
                            
                            <button 
                                onClick={() => manejarClickDetalles(pokemon.name)} 
                                style={{ marginLeft: '10px' }}
                            >
                                Ver Detalles
                            </button>
                            
                        </li>
                    ))}
                </ul>
            )}

            {!estaCargando && listaPokemon.length === 0 && !error && (
                <p>Haz clic en el botón para cargar los primeros 20 Pokémon.</p>
            )}
        </div>
    );
};


