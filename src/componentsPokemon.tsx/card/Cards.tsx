
import { CardPokemon } from './CardPokemon'



export const Cards = ({results}) => {
  return (
    <div className='container'>
        <ul className='cards'>
            {
                results.map (p => (
                    <li className = 'card-item' key={p.name}>
                        <CardPokemon url={p.url} />
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
