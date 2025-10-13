import DataPokemon from "./DataPokemon"
import { Cards } from "./card/Cards"

import {useState, useEffect} from 'react'

useEffect(() => {
  getDatos(offset)
},[])

export const Pokemon = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    const estado = DataPokemon(url);
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(25) 
    const {cargando, data} = estado
    cargando ?console.log('cargando'): console.log(data.results)
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
