import { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface PokemonDetalles {
    id: number;
    name: string;
    height: number;
    weight: number;
}

export const Detalle = () => {
    const { nombre } = useParams<{ nombre: string }>();
    
    const [detalles, setDetalles] = useState<PokemonDetalles | null>(null);
    const [estaCargando, setEstaCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!nombre) return; 

        const obtenerDetalles = async () => {
            setEstaCargando(true);
            setError(null);
            try {
                const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
                
                if (!respuesta.ok) {
                    throw new Error(`Pokémon no encontrado: ${nombre}`);
                }
                
                const datos = await respuesta.json();
                setDetalles(datos);
            } catch (err) {
                const mensaje = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
                setError(`Fallo al cargar los detalles: ${mensaje}`);
                console.error(err);
            } finally {
                setEstaCargando(false);
            }
        };

        obtenerDetalles();
    }, [nombre]);


    if (estaCargando) {
        return <h2>Cargando detalles de {nombre}...</h2>;
    }

    if (error) {
        return <h2 style={{ color: 'red' }}>Error al cargar: {error}</h2>;
    }

    if (!detalles) {
        return <h2>No se encontraron detalles para {nombre}.</h2>;
    }

    return (
        <div>
            <Link to= "/ListaPokemons" >
            Volver a la lista de Pokemons
            </Link>
            <h1>Detalles de {detalles.name.toUpperCase()}</h1>
            <p>ID: {detalles.id}</p>
            <p>Altura: {detalles.height} dm</p>
            <p>Peso: {detalles.weight} hg</p>
        </div>
    );
};

    
