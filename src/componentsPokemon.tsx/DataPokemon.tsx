import { useEffect, useState } from "react";

interface Props{
    url:URL
}

const DataPokemon  = (url) => { 

    const [resultado, setResultado] = useState({cargando:true, data:null})
    /* const url = 'https://pokeapi.co/api/v2/pokemon/' */
    
    useEffect(()=>{
        getDatos(url)
    },[url])

    async function  getDatos (url: Props){
        try{
            /* setResultado ({cargando:true, data:null}) */
            const resp= await fetch (url)
            const data = await resp.json();
            setResultado({cargando:false, data})

        }
        catch(error){
            console.log(error)
        }
    }

    /* const AllPokemons = () =>{
        for (let index = 0; index < 100; index++) {
            AllPokemons(index)
            
        }
    }

    useEffect(() => {
        console.log(DataPokemon)
    },[DataPokemon])
 */
  return (
    resultado
  )
}

export default DataPokemon
