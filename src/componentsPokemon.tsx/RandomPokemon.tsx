import {  useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
interface PokemonData {
    id: number;
    name: string;
    spriteUrl: string; 
    height: number;
    weight:number;
    types: PokemonTypeEntry[]
}

interface PokemonType {
    name: string;
    url: string;
}

interface PokemonTypeEntry {
    slot: number;
    type: PokemonType;
}

export const RandomPokemon = () => {

    const navigate = useNavigate()

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
                types:datos.types,
                height:datos.height / 10,
                weight:datos.weight / 10 ,
                spriteUrl: datos.sprites.other.home.front_default, 
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

    const tiposEspañol: { [key: string]: string } = {
    'normal': 'Normal',
    'fighting': 'Lucha',
    'flying': 'Volador',
    'poison': 'Veneno',
    'ground': 'Tierra',
    'rock': 'Roca',
    'bug': 'Bicho',
    'ghost': 'Fantasma',
    'steel': 'Acero',
    'fire': 'Fuego',
    'water': 'Agua',
    'grass': 'Planta',
    'electric': 'Eléctrico',
    'psychic': 'Psíquico',
    'ice': 'Hielo',
    'dragon': 'Dragón',
    'fairy': 'Hada',
    'dark': 'Siniestro',
    'unknow': 'Desconocido',
    'shadow': 'Sombra'
};

const irALista = () => {
        navigate('/ListaPokemons'); 
    };


    return (
        <>
            <div className='container-descripcion'>
            <h1>Bienvenidxs al buscador de Pokemones!</h1>
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
                    <h2>¡Has encontrado a {pokemonAleatorio.name.toUpperCase()} !</h2>
                    <h3>Pokemón #{pokemonAleatorio.id}!</h3>
                    {pokemonAleatorio.spriteUrl ? (
                        <img 
                            src={pokemonAleatorio.spriteUrl} 
                            alt={`Imagen de ${pokemonAleatorio.name}`} 
                        />
                    ) : (
                        <p>No hay imagen disponible.</p>
                    )}

                    <p>Altura: {pokemonAleatorio.height} m</p>
                    <p>Peso: {pokemonAleatorio.weight} kg </p>
                    <p>
                        Tipo(s):
                        {pokemonAleatorio.types.map((typeEntry, index) => {
                   
                            const tipoEnIngles = typeEntry.type.name;
                            const tipoEnEspanol = tiposEspañol[tipoEnIngles] || tipoEnIngles;
                    return(
                    <span key={index}>
                        {tipoEnEspanol}
                        {index < pokemonAleatorio.types.length - 1 ? ', ' : ''}
                    </span>
                );
            })}
</p>
                </div>
            )}
            


        </div>
        <div className='container-descripcion-lista'>
            <h2>Toca el botón para ver la lista completa de Pokemones</h2>
            <button onClick={irALista}>Pokemones</button>
        </div>
        </>

        
    );
};