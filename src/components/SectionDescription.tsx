/* import  DataPokemon from "../componentsPokemon.tsx/DataPokemon" */
/* import { Pokemon } from "../componentsPokemon.tsx/Pokemon" */




import {RandomPokemon} from '../componentsPokemon.tsx/RandomPokemon'


const SectionDescription = (  ) => {
   return(
    <div className="container-descripcion">
        <p>
            En esta pagina podas encontrar todos los datos de tus pokemons favoritos.
            <br /> Como este ejemplo: 
        </p>
        <div> <RandomPokemon/></div>
    </div>
   ) 
}

export default SectionDescription