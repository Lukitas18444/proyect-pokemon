import {Routes, Route, BroswerRouter} from 'react-router-dom'

import {Pokemon} from '../pages/pokemon'

export const Nav = () => {
    const navItem = [
        {label: 'Inicio', href:'/'},
        {label: 'Pokemon', href:'../pages/pokemon'},
        {label: 'contacto', href:'contacto'},
    ]


  return (
<BroswerRouter>
    <Routes>
        <nav>
            <ul>
                {navItem.map((item, index)=>(
                    <Route>
                        <li key={index}>
                        <a href={item.href}> {item.label} </a>
                    </li>
                    </Route>
                ))}
            </ul>
        </nav>

    </Routes>
   
</BroswerRouter>
        


    
  )
}
