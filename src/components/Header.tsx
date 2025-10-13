

import { Nav } from "./Nav";


interface Props{
    title: string;
}

 const Header = ({title}: Props) => {
  
return (
    <>

        <div className="header">{title}
        <Nav/>
      

        </div>

        


    </>
  )
}

export default Header
