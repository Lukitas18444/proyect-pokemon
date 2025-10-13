



export const Nav = () => {
    const navItem = [
        {label: 'Inicio', href:'/'},
        {label: 'Pokemon', href:'../pages/pokemon'},
        {label: 'contacto', href:'contacto'},
    ]


  return (
<nav>
            <ul>
                {navItem.map((item, index)=>(

                        <li key={index}>
                        <a href={item.href}> {item.label} </a>
                    </li>

                ))}
            </ul>
        </nav>
        


    
  )
}
