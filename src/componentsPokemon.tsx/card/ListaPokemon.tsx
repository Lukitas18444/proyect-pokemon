import React, { useState } from 'react';


interface PokemonResult {
    name: string;
    url: string;
}



export const RandomPokemon = () => {

    const [listaPokemon, setListaPokemon] = useState<PokemonResult[]>([]);

    const [estaCargando, setEstaCargando] = useState(false);

    const [error, setError] = useState<string | null>(null);
/*     const [numeroPokemon, setNumeroPokemon] = useState(20) */


    const idAleatorio = Math.floor(Math.random() * 100 + 1);
    const base_url = `https://pokeapi.co/api/v2/item/${idAleatorio}/`;


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

/*     const mostrarMas = () => {
      if(limit === 20){
        mostrarMas === null
        setLimit(limit + 20)
      }   else{
        setLimit(limit + 20)
        buscarPokemon()
      }
 } */

    
    return (
        <div>
            <h2>ID Aleatorio: {idAleatorio} </h2>
            <h3>URL Base de la API: {base_url} </h3>
            
            {/* <button onClick={buscarPokemon} disabled={estaCargando}>
                {estaCargando ? 'Cargando...' : 'Buscar Lista de Pokémon'}
            </button> */}
          {/*   
            <button onClick={mostrarMas}>
              Mostrar mas Pokemon
            </button> */}



            <h2>Lista de Pokémon</h2>

           
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            {estaCargando && <p>Cargando Pokémon...</p>}

           
            {!estaCargando && listaPokemon.length > 0 && (
                <ul>
                   
                    {listaPokemon.map((pokemon) => (
                        <li key={pokemon.name}>
                            <strong>{pokemon.name}</strong> 
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


