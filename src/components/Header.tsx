interface Props{
    title: string;
    item ?: [];
}

export const Header = ({title}: Props) => {
  
  
return (
    <>
    <div className="header">{title}
 
        <ul className="container-nav">
            <li>Inicio</li>
            <li>Lista</li>
            <li>Contacto</li>
        </ul>

    </div>
    </>
  )
}
