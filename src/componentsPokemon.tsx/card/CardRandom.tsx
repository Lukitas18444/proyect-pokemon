import { CardPokemon } from './CardPokemon'

interface Props{
    p: string
}

export const Card = ({results}) => {
  return (
    <div className='container'>
        <ul className='cards'>
            {
                results.map ((p: Props) => (
                    <li className = 'card-item' key={p.name}>
                        <CardPokemon url={p.url} />
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
