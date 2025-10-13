import { useEffect, useState } from "react";

interface Props{
    url:URL
}

const DataPokemon  = (url) => { 

    const [resultado, setResultado] = useState({cargando:true, data:null})

    
    useEffect(()=>{
        getDatos(url)
    },[url])

    async function  getDatos (url: Props){
        try{
            const resp= await fetch (url)
            const data = await resp.json();
            setResultado({cargando:false, data})

        }
        catch(error){
            console.log(error)
        }
    }


  return (
    resultado
  )
}

export default DataPokemon
