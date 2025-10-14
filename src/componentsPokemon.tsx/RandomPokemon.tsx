import React, { useState } from 'react';

// Define un tipo para el Pokémon que vamos a guardar (simplificado)
interface PokemonData {
    id: number;
    name: string;
    // Puedes añadir más propiedades como 'sprites', 'types', etc., si las necesitas
    spriteUrl: string; 
}

export const RandomPokemon = () => {
    // 1. Estado para guardar los datos del Pokémon aleatorio individual
    const [pokemonAleatorio, setPokemonAleatorio] = useState<PokemonData | null>(null);
    // 2. Estado para manejar el estado de carga
    const [estaCargando, setEstaCargando] = useState(false);
    // 3. Estado para manejar errores
    const [error, setError] = useState<string | null>(null);

    // Genera un ID aleatorio cada vez que el componente se renderiza.
    // Lo ideal es generar esto DENTRO de la función de búsqueda para que cambie al hacer clic.
    // Sin embargo, si quieres que el ID sea fijo por render, lo dejas aquí:
    // const idAleatorio = Math.floor(Math.random() * 100 + 1); // Rango del 1 al 100

    // Función asíncrona para buscar un Pokémon específico por ID
    const buscarPokemonAleatorio = async () => {
        // 1. Generar un nuevo ID aleatorio justo antes de la búsqueda
        const nuevoIdAleatorio = Math.floor(Math.random() * 898) + 1; // Rango: 1 a 898 (Gen 8)
        const url_con_id = `https://pokeapi.co/api/v2/pokemon/${nuevoIdAleatorio}`;

        setEstaCargando(true);
        setError(null);
        setPokemonAleatorio(null); // Limpiar el anterior

        try {
            const respuesta = await fetch(url_con_id);
            
            if (!respuesta.ok) {
                throw new Error(`¡Error HTTP! Estado: ${respuesta.status}. ¿Existe el ID ${nuevoIdAleatorio}?`);
            }
            
            const datos = await respuesta.json();
            
            // 2. Mapear los datos de la API al formato que queremos guardar en el estado
            const dataMapeada: PokemonData = {
                id: datos.id,
                name: datos.name,
                // Usamos el sprite frontal por defecto
                spriteUrl: datos.sprites.front_default, 
            };

            // 3. Guardar el único Pokémon en el estado
            setPokemonAleatorio(dataMapeada);
            
        } catch (err) {
            const mensaje = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
            setError(`Fallo al buscar Pokémon: ${mensaje}`);
            console.error(err);
        } finally {
            setEstaCargando(false);
        }
    };

    // Lógica de renderizado
    return (
        <div>
            <h1>Buscador de Pokémon Aleatorio</h1>
            
            <button onClick={buscarPokemonAleatorio} disabled={estaCargando}>
                {estaCargando ? 'Buscando...' : 'Buscar Pokémon Aleatorio'}
            </button>
            
            <hr />

            {/* Renderizado Condicional */}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            {estaCargando && <p>Cargando un Pokémon sorpresa...</p>}

            {/* Mostrar el Pokémon si ya se ha cargado */}
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