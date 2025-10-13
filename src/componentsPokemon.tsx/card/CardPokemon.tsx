import  DataPokemon  from '../DataPokemon.tsx'
export const CardPokemon = ({url}) => {
    const estado = DataPokemon(url)
    const {cargando, data} = estado
  return (
    <>
        {
        
        cargando
            ?
            <h1>Cargando</h1>
            :
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>
                        {data.id}
                    </h5>
                </div>
                <div className='card-body'>
                    <img src={data.sprites.front_default}  alt="pokemon" />
                </div>
                <div className='card-footer'>
                    <p className='card-text'>
                        {data.forms[0].name}
                    </p>
                </div>
            </div>
        
        }    
    </>
  )
}
