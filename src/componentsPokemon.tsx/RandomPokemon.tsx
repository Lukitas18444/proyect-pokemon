

import React, { useState } from 'react';
interface PokemonData {
    id: number;
    name: string;
    spriteUrl: string; 
}

export const RandomPokemon = () => {

    const [pokemonAleatorio, setPokemonAleatorio] = useState<PokemonData | null>(null);

    const [estaCargando, setEstaCargando] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const buscarPokemonAleatorio = async () => {

        const nuevoIdAleatorio = Math.floor(Math.random() * 1024 ) + 1; 
        const url_con_id = `https://pokeapi.co/api/v2/pokemon/${nuevoIdAleatorio}`;

        setEstaCargando(true);
        setError(null);
        setPokemonAleatorio(null); 

        try {
            const respuesta = await fetch(url_con_id);
            
            if (!respuesta.ok) {
                throw new Error(`¡Error HTTP! Estado: ${respuesta.status}. ¿Existe el ID ${nuevoIdAleatorio}?`);
            }
            
            const datos = await respuesta.json();

            

            const dataMapeada: PokemonData = {
                id: datos.id,
                name: datos.name,

                spriteUrl: datos.sprites.front_default, 
            };


            setPokemonAleatorio(dataMapeada);
            
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
            setError(`Fallo al buscar Pokémon: ${mensaje}`);
            console.error(err);
        } finally {
            setEstaCargando(false);
        }
    };


    return (
        <div className='container-descripcion'>
            <h1>Bienvenidxs al buscador de Pokemons!</h1>
            <h2>Aquí encontraras a todos los pokemones con sus habilidades y detalles.</h2>
            <p>Toca el botón para ver el ejemplo</p>
            
            <button onClick={buscarPokemonAleatorio} disabled={estaCargando}>
              
                {estaCargando ? 'Buscando...' : 'Pokémon Aleatorio'}
            </button>
            
            <hr />



            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            {estaCargando && <p>Cargando un Pokémon sorpresa...</p>}

            {!estaCargando && pokemonAleatorio && (
                <div className='container-card-aleatorio'>
                    <h2>¡Has encontrado a #{pokemonAleatorio.id}!</h2>
                    <h3>{pokemonAleatorio.name.toUpperCase()}</h3>
                    {pokemonAleatorio.spriteUrl ? (
                        <img 
                            src={pokemonAleatorio.spriteUrl} 
                            alt={`Imagen de ${pokemonAleatorio.name}`} 
                        />
                    ) : (
                        <p>No hay imagen disponible.</p>
                    )}
                </div>
            )}
            


        </div>

        
    );
};