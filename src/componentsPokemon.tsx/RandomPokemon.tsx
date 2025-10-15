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

        const nuevoIdAleatorio = Math.floor(Math.random() * 898) + 1; 
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
        <div>
            <h1>Buscador de Pokémon Aleatorio</h1>
            
            <button onClick={buscarPokemonAleatorio} disabled={estaCargando}>
                {estaCargando ? 'Buscando...' : 'Buscar Pokémon Aleatorio'}
            </button>
            
            <hr />



            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            {estaCargando && <p>Cargando un Pokémon sorpresa...</p>}

            {!estaCargando && pokemonAleatorio && (
                <div style={{ border: '1px solid #ccc', padding: '15px', maxWidth: '300px', margin: '20px auto', textAlign: 'center' }}>
                    <h2>¡Has encontrado a #{pokemonAleatorio.id}!</h2>
                    <h3>{pokemonAleatorio.name.toUpperCase()}</h3>
                    {pokemonAleatorio.spriteUrl ? (
                        <img 
                            src={pokemonAleatorio.spriteUrl} 
                            alt={`Imagen de ${pokemonAleatorio.name}`} 
                            style={{ width: '150px', height: '150px' }}
                        />
                    ) : (
                        <p>No hay imagen disponible.</p>
                    )}
                </div>
            )}
            
            {!estaCargando && !pokemonAleatorio && !error && (
                <p>Haz clic en el botón para encontrar tu primer Pokémon aleatorio.</p>
            )}
        </div>
    );
};