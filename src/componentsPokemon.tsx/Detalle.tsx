import { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface PokemonDetalles {
    id: number;
    name: string;
    height: number;
    weight: number;
    spriteUrl: string;
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

                const datosMapeados: PokemonDetalles = {
                id: datos.id,
                name: datos.name,
                height: datos.height /10,
                weight: datos.weight /10,
                types:datos.types,
                spriteUrl: datos.sprites.other['official-artwork']?.front_default || datos.sprites.front_default || '',
            };

                setDetalles(datosMapeados);
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

    return (
        <div>
            <p className='button-volver'>
            <Link to= "/ListaPokemons" >
                Volver a la lista de Pokemons
            </Link>
            </p>

            <div className='container-detalle'>
                <h1 className='h1'>Detalles de {detalles.name.toUpperCase()}</h1>
                <hr />
                <img 
                    src={detalles.spriteUrl} 
                    alt={`Imagen de ${detalles.name}`} 
                />
                <div className="container-detalle-items">
                    <p>N° de Pókemon: {detalles.id}</p>
                    <p>Altura: {detalles.height} m</p>
                    <p>Peso: {detalles.weight} kg</p>
                </div>
                <p className='container-detalle-tipos'>
                        Tipo(s):
                        {detalles.types.map((typeEntry, index) => {
                   
                            const tipoEnIngles = typeEntry.type.name;
                            const tipoEnEspanol = tiposEspañol[tipoEnIngles] || tipoEnIngles;
                    return(
                    <span key={index}>
                        {tipoEnEspanol}
                        {index < detalles.types.length - 1 ? ', ' : ''}
                    </span>
                );
            })}
                    </p>

            </div>
        </div>
    );
};

    
