
import { Outlet, Link } from 'react-router-dom';
import PokemonLogo from '../assets/logoPokemon.png'

const Nav = () => (
    <nav className='nav'>

            <img src={PokemonLogo} alt="" className='pokemon-logo' />

        <div className='nav-container'>
        <Link to="/" >
            Home
        </Link>
        <Link to= "/ListaPokemons" >
            Lista de Pokemons
        </Link>
      
        </div>

    
    </nav>
);

const NavLayout = () => {
    return (
        <>    
            <Nav /> 
            <main >
                <Outlet /> 
            </main>
        </>
    );
};

export default NavLayout;