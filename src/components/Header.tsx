interface Props{
    title: string,
    item?: string,
}



export const Header = ({title}:Props) => {

        const Li = () => {
    return 
        ( 
            <li>Prueba li</li>
        )
        
    } 


    
  return (
    <div className="headerComponent">
        <h1> {title} </h1>
        <ul className="itemUl">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>

)
    }

