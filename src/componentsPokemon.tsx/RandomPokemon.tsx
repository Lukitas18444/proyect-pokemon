import DataPokemon from "./DataPokemon"
import { Cards } from "./card/Cards"

import {useState} from 'react'

interface Props{
    data:string;
}

export const RandomPokemon = () => {
    const [url,setUrl] = useState('https://pokeapi.co/api/v2/pokemon/ ')
    const estado = DataPokemon(url);
    const {cargando, data} = estado
    cargando ?console.log('cargando'): console.log((data.results))
  return (
   <>
     {
        cargando 
        ? 
        <h1>Cargando...</h1>
        :
        <Cards results = {data.results}/>
     }
   </>  
  )
}


