import DataPokemon from "./DataPokemon"
import {CardRandom} from '../componentsPokemon.tsx/card/CardRandom'

import {useState} from 'react'



export const RandomPokemon = () => {
    
    const random = Math.floor(Math.random()*100+ 1)
    const indexGame = random
  
  
    const [url,setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${indexGame} `)
    const estado = DataPokemon(url);
    const {cargando, data} = estado
    cargando ? console.log('cargando') : console.log(data.results);
    
    

  return (
   <>
     {
        cargando 
        ? 
        <h1>Cargando...</h1>
        :
        <CardRandom results = {data.results}/>
     }
   </>  
  )
}


